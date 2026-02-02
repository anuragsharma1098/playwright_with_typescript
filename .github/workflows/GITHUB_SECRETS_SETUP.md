# GitHub Secrets Setup Guide

This guide explains how to set up email notifications for Playwright test results in GitHub Actions.

## Step 1: Get SMTP Credentials

### For Gmail (Free)
1. Go to [myaccount.google.com](https://myaccount.google.com)
2. Left sidebar → **Security**
3. Enable **2-Step Verification** (if not already enabled)
4. Search for **App passwords** → Select Mail & Windows
5. Copy the 16-character password shown
6. Save these values:
   - `SMTP_SERVER`: `smtp.gmail.com`
   - `SMTP_PORT`: `465`
   - `SMTP_USERNAME`: your email (e.g., `your.email@gmail.com`)
   - `SMTP_PASSWORD`: the 16-char app password

### For Outlook/Office 365
- `SMTP_SERVER`: `smtp.office365.com`
- `SMTP_PORT`: `587`
- `SMTP_USERNAME`: your email
- `SMTP_PASSWORD`: your password

### For Other Providers
- Search "[Your Email Provider] SMTP settings"

---

## Step 2: Add GitHub Secrets

1. Go to your GitHub repo on the web
2. Click **Settings** (top right of repo)
3. Left sidebar → **Secrets and variables** → **Actions**
4. Click **New repository secret**
5. Add each secret one by one:

| Name | Value | Example |
|------|-------|---------|
| `SMTP_SERVER` | Email provider's SMTP server | `smtp.gmail.com` |
| `SMTP_PORT` | SMTP port (usually 465 or 587) | `465` |
| `SMTP_USERNAME` | Email address | `your-email@gmail.com` |
| `SMTP_PASSWORD` | App password or email password | `your-16-char-app-password` |
| `EMAIL_FROM` | Sender email address | `your-email@gmail.com` |
| `EMAIL_RECIPIENT` | Where to send test results | `your-email@gmail.com` |

---

## Step 3: Verify Your Workflow File

Check that your `.github/workflows/playwright.yml` has the email notification step configured.

Once verified, commit and push your changes:

```bash
git add .github/workflows/playwright.yml
git commit -m "Add email notification to test results"
git push
```

---

## Step 4: Test It

1. Push a commit to trigger the workflow
2. Go to **Actions** tab in your GitHub repo
3. Click the latest workflow run
4. Check logs for success/errors
5. Check your email inbox (including spam folder)

---

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| "Authentication failed" | Use [App Password](https://myaccount.google.com/apppasswords) for Gmail, not your regular password |
| Email not received | Check spam/junk folder, verify `EMAIL_RECIPIENT` is correct |
| Workflow fails | Check the **Actions** tab logs for detailed error messages |
| 2FA not enabled for Gmail | Gmail requires 2FA enabled before App Passwords work |
| Port 587 vs 465 | Use 465 for SSL (Gmail), 587 for TLS (Outlook) |

---

## Email Content

The workflow will send an email with:
- Test run URL (link to GitHub Actions)
- Branch name
- Commit hash
- Job status (success/failure)
- Link to view full test report

---

## Additional Configuration

To customize the email further, edit `.github/workflows/playwright.yml`:

```yaml
- name: Send test results via email
  if: ${{ always() }}
  uses: dawidd6/action-send-mail@v3
  with:
    server_address: ${{ secrets.SMTP_SERVER }}
    server_port: ${{ secrets.SMTP_PORT }}
    username: ${{ secrets.SMTP_USERNAME }}
    password: ${{ secrets.SMTP_PASSWORD }}
    subject: "Playwright Test Results - ${{ job.status }}"
    to: ${{ secrets.EMAIL_RECIPIENT }}
    from: ${{ secrets.EMAIL_FROM }}
    body: |
      Test Run: ${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}
      Branch: ${{ github.ref }}
      Commit: ${{ github.sha }}
      Status: ${{ job.status }}
      
      See attached test report for details.
```

You can modify the `subject` and `body` fields to customize the email message.

---

## Security Notes

- Never commit secrets directly to code
- Always use GitHub Secrets for sensitive data
- App passwords are safer than regular passwords for automation
- Secrets are masked in workflow logs automatically
