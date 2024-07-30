Feature: Events Hub - CaaS Block

  Background:
    Given I have a new browser context

  @MWPW-127201xx @smoke @caas
  Scenario Outline: Sorting events
    Given I am on the Events Hub page
     Then I scroll to the "Explore events near you." header
     When I sort the events by "<Sort Criteria>"
     Then the events are displayed in "<Order>" order

  Examples:
      | Sort Criteria                      | Order            |
      | Date: (Newest to Oldest)           | Last modified    |
      | Events: (Live, Upcoming, OnDemand) | Event type       |
      | Title A-Z                          | Ascending title  |
      | Title Z-A                          | Descending title |
