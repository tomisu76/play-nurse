import { expect, test } from '@playwright/test';

test('AI Nursing English Voice Trainer flow works with fallbacks', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('AI Nursing English Voice Trainer')).toBeVisible();
  await expect(page.getByText('Fever and Rash')).toBeVisible();
  await page.getByText('Fever and Rash').click();
  await expect(page.getByText('Simple OSCE Voice Practice')).toBeVisible();
  await page.getByText('Demo Transcript').click();
  await expect(page.getByLabel('Transcript')).not.toBeEmpty();
  await page.getByText('Send to Patient').click();
  await expect(page.getByText(/patient:/i)).toBeVisible();
  await page.getByText('End Scenario').click();
  await expect(page.getByText('Feedback Report')).toBeVisible();
  await expect(page.getByText('/100')).toBeVisible();
});
