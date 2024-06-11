function getESLConfig() {
  return {
    local: { host: 'http://localhost:8499' },
    stage: { host: 'https://wcms-events-service-layer-deploy-ethos102-stage-va-9c3ecd.stage.cloud.adobe.io' },
    prod: { host: 'https://wcms-events-service-layer-deploy-ethos102-stage-va-9c3ecd.stage.cloud.adobe.io' },
  };
}

function constructRequestOptions(method, body = null) {
  const headers = new Headers();
  const authToken = window.adobeIMS.getAccessToken().token;
  headers.append('Authorization', `Bearer ${authToken}`);
  headers.append('content-type', 'application/json');

  const options = {
    method,
    headers,
  };

  if (body) options.body = body;

  return options;
}

export async function uploadImage(file) {
  const { host } = getESLConfig()[window.miloConfig.env.name];
  const formData = new FormData();
  formData.append('file', file);

  await fetch(`${host}/upload`, {
    method: 'POST',
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

export async function uploadBinaryFile(file, configs) {
  const headers = new Headers();
  headers.append('x-image-kind', configs.type);
  headers.append('x-image-alt-text', configs.altText);
  headers.append('Authorization', 'Bearer');

  try {
    const response = await fetch(configs.targetUrl, {
      method: 'POST',
      headers,
      body: file,
    });

    if (response.ok) {
      const responseData = await response.text();
      console.log('Success:', responseData);
    } else {
      console.error('Error Status:', response.status);
    }
  } catch (error) {
    console.error('Network error', error);
  }
}

export async function createVenue(eventId, venueData) {
  const { host } = getESLConfig()[window.miloConfig.env.name];
  const raw = JSON.stringify(venueData);
  const options = constructRequestOptions('POST', raw);

  const resp = await fetch(`${host}/v1/events/${eventId}/venues`, options).then((res) => res.json()).catch((error) => console.log(error));
  return resp;
}

export async function createEvent(payload) {
  const { host } = getESLConfig()[window.miloConfig.env.name];
  const raw = JSON.stringify(payload);
  const options = constructRequestOptions('POST', raw);

  const resp = await fetch(`${host}/v1/events`, options).then((res) => res.json()).catch((error) => console.log(error));
  console.log('attempted to create event', payload, resp);
  return resp;
}

export async function createSpeaker(profile, seriesId) {
  const { host } = getESLConfig()[window.miloConfig.env.name];
  const raw = JSON.stringify({ ...profile, seriesId });
  console.log(raw);
  const options = constructRequestOptions('POST', raw);

  const resp = await fetch(`${host}/v1/speakers`, options).then((res) => res.json()).catch((error) => console.log(error));
  console.log('attempted to create speaker', raw, resp);
  return resp;
}

export async function updateEvent(eventId, payload) {
  const { host } = getESLConfig()[window.miloConfig.env.name];
  const raw = JSON.stringify(payload);
  const options = constructRequestOptions('PUT', raw);

  const resp = await fetch(`${host}/v1/events/${eventId}`, options).then((res) => res.json()).catch((error) => console.log(error));
  console.log(payload, resp);
  return resp;
}

export async function publishEvent(eventId, payload) {
  const { host } = getESLConfig()[window.miloConfig.env.name];
  const raw = JSON.stringify({ ...payload, published: true });
  const options = constructRequestOptions('PUT', raw);

  const resp = await fetch(`${host}/v1/events/${eventId}`, options).then((res) => res.json()).catch((error) => console.log(error));
  return resp;
}

export async function unpublishEvent(eventId, payload) {
  const { host } = getESLConfig()[window.miloConfig.env.name];
  const raw = JSON.stringify({ ...payload, published: false });
  const options = constructRequestOptions('PUT', raw);

  const resp = await fetch(`${host}/v1/events/${eventId}`, options).then((res) => res.json()).catch((error) => console.log(error));
  return resp;
}

export async function deleteEvent(eventId) {
  const { host } = getESLConfig()[window.miloConfig.env.name];
  const options = constructRequestOptions('DELETE');

  const resp = await fetch(`${host}/v1/events/${eventId}`, options).then((res) => res.json()).catch((error) => console.log(error));
  return resp;
}

export async function getEvents() {
  const { host } = getESLConfig()[window.miloConfig.env.name];
  const options = constructRequestOptions('GET');

  const resp = await fetch(`${host}/v1/events`, options).then((res) => res.json()).catch((error) => console.log(error));
  return resp;
}

export async function getEvent(eventId) {
  const { host } = getESLConfig()[window.miloConfig.env.name];
  const options = constructRequestOptions('GET');

  const resp = await fetch(`${host}/v1/events/${eventId}`, options).then((res) => res.json()).catch((error) => console.log(error));
  return resp;
}

export async function getVenue(venueId) {
  const { host } = getESLConfig()[window.miloConfig.env.name];
  const options = constructRequestOptions('GET');

  const resp = await fetch(`${host}/v1/venues/${venueId}`, options).then((res) => res.json()).catch((error) => console.log(error));
  return resp;
}

export async function getClouds() {
  // TODO: use ESP to fetch clouds rather than Chimera
  const resp = await fetch('https://www.adobe.com/chimera-api/tags').then((res) => res.json()).catch((error) => error);

  if (!resp.error) {
    const clouds = resp.namespaces.caas.tags['business-unit'].tags;
    return clouds;
  }

  return null;
}

export async function getSeries() {
  const { host } = getESLConfig()[window.miloConfig.env.name];
  const options = constructRequestOptions('GET');
  const resp = await fetch(`${host}/v1/series`, options).then((res) => res.json()).catch((error) => error);

  if (!resp.error) {
    const { series } = resp;
    return series;
  }

  return null;
}

export async function createAttendee(eventId, attendeeData) {
  if (!eventId || !attendeeData) return false;

  const { host } = getESLConfig()[window.miloConfig.env.name];
  const raw = JSON.stringify(attendeeData);
  const options = constructRequestOptions('POST', raw);

  const resp = await fetch(`${host}/v1/events/${eventId}/attendees`, options).then((res) => res.json()).catch((error) => console.log(error));
  return resp;
}

export async function updateAttendee(eventId, attendeeId, attendeeData) {
  if (!eventId || !attendeeData) return false;

  const { host } = getESLConfig()[window.miloConfig.env.name];
  const raw = JSON.stringify(attendeeData);
  const options = constructRequestOptions('PUT', raw);

  const resp = await fetch(`${host}/v1/events/${eventId}/attendees/${attendeeId}`, options).then((res) => res.json()).catch((error) => console.log(error));
  return resp;
}

export async function deleteAttendee(eventId, attendeeId) {
  if (!eventId || !attendeeId) return false;

  const { host } = getESLConfig()[window.miloConfig.env.name];
  const options = constructRequestOptions('DELETE');

  const resp = await fetch(`${host}/v1/events/${eventId}/attendees/${attendeeId}`, options).then((res) => res.json()).catch((error) => console.log(error));
  return resp;
}

export async function getAttendees(eventId) {
  if (!eventId) return false;

  const { host } = getESLConfig()[window.miloConfig.env.name];
  const options = constructRequestOptions('GET');

  const resp = await fetch(`${host}/v1/events/${eventId}/attendees`, options).then((res) => res.json()).catch((error) => console.log(error));
  return resp;
}

export async function getAttendee(eventId, attendeeId) {
  if (!eventId || !attendeeId) return false;

  const { host } = getESLConfig()[window.miloConfig.env.name];
  const options = constructRequestOptions('GET');

  const resp = await fetch(`${host}/v1/events/${eventId}/attendees/${attendeeId}`, options).then((res) => res.json()).catch((error) => console.log(error));
  return resp;
}
