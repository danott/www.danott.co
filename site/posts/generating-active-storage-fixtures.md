---
date: 2020-01-17
title: Generating ActiveStorage Fixtures
---

[ActiveStorage][] is the Rails Way to attach files to your models.
Building on the strategy of [using test fixtures as development seeds][], I was searching for a solution to represent `ActiveStorage::Blob` and `ActiveStorage::Attachment` as `YAML` fixtures.
I couldn't find anything in the docs, so I decided to role my own.

## Strategy

1. Place files into `test/fixtures/files/attached/` with a naming convention for associating the files with fixture records.
2. Iterate over those files to generate the `test/fixtures/active_storage/blobs.yml` and `test/fixtures/active_storage/attachments.yml` yaml files.

Let's say I have a model of `User`, and that `User#has_one_attached :avatar`.

My `test/fixtures/users.yml` file looks something like this.

```yaml
# test/fixtures/users.yml
michael_scott:
  name: Michael Scott
  email: michael@dunder.mifflin

jim_halpert:
  name: Jim Halpert
  email: jim@dunder.mifflin
```

To associate an avatar I need an `ActiveStorage::Blob` that represents the file and the `ActiveStorage::Attachment` that joins the `User` to the blob.

```yaml
# test/fixtures/active_storage/attachments.yml
michael_scott_avatar:
  record: michael_scott (User)
  blob: michael_scott_avatar

# test/fixtures/active_storage/blobs.yml
michael_scott_avatar:
  # ...do we really want to hand type these attributes?
```

## Execution

Here's the file naming convention I chose to represent these relationships.

```
test/fixtures/files/attached/User.michael_scott.avatar.jpg
test/fixtures/files/attached/User.jim_halpert.avatar.jpg
```

That is, `record_type.record_fixture_name.attachment_name.jpg`.
With this tiny convention in place and a little Ruby we have everything we need to translate this folder of files into `YAML` fixtures.

```ruby
class ActiveStorageFixtures
  DEFAULT_SOURCE = Rails.root.join("test/fixtures/files/attached/*")

  attr_reader :source

  def initialize(source: DEFAULT_SOURCE)
    @source = source
  end

  def blobs
    naming_convention_files.each_with_object({}) do |naming_convention_file, object|
      object[naming_convention_file.fixture_name] = naming_convention_file.blob_attributes
    end
  end

  def attachments
    naming_convention_files.each_with_object({}) do |naming_convention_file, object|
      object[naming_convention_file.fixture_name] = naming_convention_file.attachment_attributes
    end
  end

  def naming_convention_files
    Dir.glob(source).map { |pathname| NamingConventionFile.new(pathname) }
  end

  class NamingConventionFile
    attr_reader :attachment_name
    attr_reader :filename
    attr_reader :fixture_name
    attr_reader :pathname
    attr_reader :record_fixture_name
    attr_reader :record_type

    def initialize(pathname)
      @pathname = Pathname.new(pathname)
      @filename = File.basename(pathname).to_s
      @fixture_name = filename.underscore.tr(".", "_")

      parts = filename.split(".")
      @record_type = parts.first
      @record_fixture_name = parts.second
      @attachment_name = parts.third
    end

    def blob_attributes
      blob = ActiveStorage::Blob.new(filename: filename)
      blob.key # NOTE: we could do something to make this deterministic on every run, but YAGNI?
      blob.unfurl(pathname.open, identify: true)

      attributes = blob.attributes.except("id", "created_at", "metadata")
      attributes["metadata"] = blob.metadata.to_h
      attributes
    end

    def attachment_attributes
      {
        "name" => attachment_name,
        "record" => "#{record_fixture_name} (#{record_type})",
        "blob" => fixture_name,
      }
    end
  end
end
```

With this in place, we can take advantage of the ability to execute `ERB` in fixtures to load the data.

```yaml
# test/fixtures/active_storage/attachments.yml
<%= ActiveStorageFixtures.new.attachments.to_yaml %>

# test/fixtures/active_storage/blobs.yml
<%= ActiveStorageFixtures.new.blobs.to_yaml %>
```

That gets all the necessary data into the database.
Which works for tests.
But my initial goal was to be able to use these same test fixtures as database seeds.
And for those seeds to be useful, we need to copy the file to the expected place.

Depending on the development setup this could be anywhere.
By default it's the `:disk_service`.
To copy the files to the appropriate place, I added this to my `db/seeds.rb` file.

```ruby
# db/seeds.rb
# Building on the strategy of https://www.danott.co/posts/seeding-development-with-test-fixtures

def copy_active_storage_blobs
  ActiveStorage::Blob.find_each do |blob|
    source_file = ActiveStorageFixtures::DEFAULT_SOURCE.to_s.gsub("*", blob.filename.to_s)
    blob_key_folder = blob_key_to_disk_service_folder(blob.key)
    target_file = blob_key_folder.join(blob.key)
    FileUtils.mkdir_p(blob_key_folder)
    FileUtils.cp(source_file, target_file)
  end
end

def blob_key_to_disk_service_folder(key)
  disk_service_root = Pathname.new(ActiveStorage::Blob.service.root)
  disk_service_convention_depth_1 = key[0, 2]
  disk_service_convention_depth_2 = key[2, 2]
  disk_service_root.join(disk_service_convention_depth_1, disk_service_convention_depth_2)
end

if confirmed?
  load_development_fixtures
  copy_active_storage_blobs
end
```

And now we have `ActiveStorage` test fixtures that can act as fully hydrated development seeds.
Pretty cool!

[activestorage]: https://edgeguides.rubyonrails.org/active_storage_overview.html
[using test fixtures as development seeds]: https://www.danott.co/posts/seeding-development-with-test-fixtures
