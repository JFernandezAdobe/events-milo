import { When, Then } from "@cucumber/cucumber";
import { EventsHub } from "../page-objects/events-hub.page";
import { expect } from "@playwright/test";
const path = require("path");
const fs = require("fs");

Then(/^I am on the Events Hub page$/, async function () {
  this.page = new EventsHub();
  await this.page.open();
});

When(/^I sort the events by "([^\"]*)"$/, async function (sortCriteria) {
  this.context(EventsHub);

  await this.page.caas.waitFor({ timeout: 10000 });
  await this.page.selectDropdownOption(sortCriteria);
});

Then(/^the events are displayed in "([^\"]*)" order$/, async function (sortOrder) {
  
  await this.page.native.waitForTimeout(5000);
});