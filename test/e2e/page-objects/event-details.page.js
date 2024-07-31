import { classes } from 'polytype';
import { EventsGnavPage } from './events-gnav.page';

export class EventDetails extends classes(EventsGnavPage) {
  constructor(contentPath) {
    super({
      super: EventsGnavPage,
      arguments: [contentPath],
    });

    this.buildProps({ 
      rsvpButton1: '[href="#rsvp-form-1"]',
      rsvpFormModal: '.dialog-modal#rsvp-form-1 .fragment',
     });
  }
}
