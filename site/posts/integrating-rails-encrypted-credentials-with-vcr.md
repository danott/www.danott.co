---
date: 2020-01-02
title: Integrating Rails Encrypted Credentials with VCR
---

Rails introduced [encrypted credentials][] in 5.2.
Encrypted credentials solves the problem of storing the application's sensitive configuration.

Before this solution the most straitforward way to protect sensitive configation was using the environment and referencing `ENV["THIS"]`, `ENV["THAT"]`, and `ENV["THE_OTHER_THING"]`.
Now we can reference the decrypted values on `Rails.application.configuration`.

[VCR][] is a gem that builds confidence when testing the interaction with external dependencies of an application.
It allows the test environment to hit a real world endpoint once, record it to a "cassette", and then play it back as a recording on repeat invocations.

One downfall to hitting real world APIs is that real world credentials could get committed to the repository.
VCR provides APIs for filtering sensitive data... if you remember to add that sensitive data before committing the cassette to the repo.

I took this approach to avoid accidentally leaking any future secrets into the VCR cassettes.

```ruby
VCR.configure do |c|
  c.cassette_library_dir = Rails.root.join("test", "vcr")
  c.hook_into :webmock

  Rails.application.credentials.config.values.each do |credential|
    c.filter_sensitive_data("<CREDENTIAL>") { credential }
  end
end
```

This approach assumes that I keep my `credentials.yml.enc` a flat hash with no nesting.
I'm happy to embrace that constraint.

[encrypted credentials]: https://guides.rubyonrails.org/security.html#custom-credentialshttps://guides.rubyonrails.org/security.html#custom-credentials
[vcr]: https://github.com/vcr/vcr
