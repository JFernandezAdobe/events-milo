import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { EventDetails } from '../page-objects/event-details.page';

const path = require('path');
const fs = require('fs');

Then(/^I am on the Create Now Event "([^\"]*)"$/, async function (path) {
  this.page = new EventDetails(path);
  await this.page.open();
});

When(/^I click the RSVP button$/, async function () {
  this.context(EventDetails);

  await this.page.rsvpButton1.waitFor({ timeout: 10000 });
  await this.page.rsvpButton1.click();
});


Then(/^I should see the form modal$/, async function () {
  this.context(EventDetails);

  await this.page.rsvpFormModal.waitFor({ timeout: 10000 });
  await expect(this.page.rsvpFormModal).toBeVisible({timeout: 10000});
});
