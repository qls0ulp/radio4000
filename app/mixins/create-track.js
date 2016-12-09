import Ember from 'ember';
import {task} from 'ember-concurrency';

const {Mixin, debug, get} = Ember;

// Creates and saves a new track on a channel.

export default Mixin.create({
	createTrack: task(function * (props, channel) {
		const flashMessages = get(this, 'flashMessages');

		if (!props || !channel) {
			debug('No track properties or  no channel.');
			return;
		}

		console.log({props, channel});

		const track = this.store.createRecord('track', {
			url: props.url,
			title: props.title,
			body: props.body,
			ytid: props.ytid
		});
		track.set('channel', channel);

		try {
			yield track.save();
		} catch (e) {
			console.log(e);
			flashMessages.warning('Could not create your track.');
		}

		try {
			const tracks = yield channel.get('tracks');
			tracks.addObject(track);
			channel.set('updated', new Date().getTime());
			yield channel.save();
			get(this, 'flashMessages').info('Your track was created', {timeout: 5000});
		} catch (e) {
			console.log(e);
			flashMessages.warning('Could not save the track to your radio');
		}

		return track;
	}).drop()
});
