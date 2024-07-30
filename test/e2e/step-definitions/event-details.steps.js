import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { EventDetails } from '../page-objects/event-details.page';

const path = require('path');
const fs = require('fs');

Then(/^I am on the Create Now Event "([^\"]*)"$/, async function (path) {
  this.page = new EventDetails(path);
  await this.page.open();
});
