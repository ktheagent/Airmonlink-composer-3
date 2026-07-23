Complete Composer 3 source audit trigger.
Audit the exact current main commit, syntax, lint, every test file, and the Build 18 Windows validator.
This trigger follows the final Build 18 release-validator assertion fix committed as 6a277eed on 2026-07-23.
Do not authorize the Windows release unless the generated audit report concludes PASS.
