import { Section } from '@amwp/platform-ui-automation/lib/common/page-objects/section';

export class CaasSection extends Section {
  constructor() {
    super();
    this.buildProps({ sortButton: '[data-testid="consonant-Select-btn"]' });
  }

  dropdown(value) {
    return this.native.locator(`//div[@data-testid="consonant-Select-options"]//button[text()="${value}"]`);
  }

  async selectDropdownOption(value) {
    await this.sortButton.click();
    await this.dropdown(value).waitFor({ timeout: 1000 });
    await this.dropdown(value).click();
  }
}
