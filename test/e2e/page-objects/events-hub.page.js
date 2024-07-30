import { classes } from 'polytype';
import { EventsGnavPage } from './events-gnav.page';
import { CaasSection } from './caas.section';

export class EventsHub extends classes(EventsGnavPage, CaasSection) {
  constructor() {
    const contentPath = '/events/hub';

    super({
      super: EventsGnavPage,
      arguments: [contentPath],
    });

    this.buildProps({ caas: '#caas' });
  }
}
