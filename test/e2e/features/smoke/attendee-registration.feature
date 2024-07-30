Feature: Event Details - Attendee Registration

  Background:
    Given I have a new browser context

  @MWPW-127201xx @smoke @rsvp
  Scenario Outline: Register to an event
    Given I am on the Create Now Event "<Page>"
     Then I sign in AdobeID
     When I click the RSVP button
     Then I should see the form modal

  Examples:
      | Page                                                                    |
      | /events/create-now/create-now-san-francisco/san-francisco/ca/2024-12-28 |
