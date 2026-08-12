import test from 'node:test';
import assert from 'node:assert/strict';
import { mockEvents, sortEventsByDate, getEventById } from './mockEvents.js';

test('mockEvents contains at least one event', () => {
  assert.ok(Array.isArray(mockEvents));
  assert.ok(mockEvents.length > 0);
});

test('sortEventsByDate orders events by date ascending', () => {
  const sorted = sortEventsByDate([
    { id: 2, date: '2026-08-12' },
    { id: 1, date: '2026-08-10' },
  ]);

  assert.deepEqual(sorted.map((event) => event.id), [1, 2]);
});

test('getEventById returns the matching event', () => {
  const event = getEventById(1);

  assert.equal(event?.id, 1);
  assert.equal(event?.name, 'Summer Music Festival');
});
