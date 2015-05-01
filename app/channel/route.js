import Ember from 'ember';

export default Ember.Route.extend({
	model(params) {
		// var model = Ember.ObjectProxy.create({});
		var slug = params.slug;

		return this.store.find('channel', {
			orderBy: 'slug',
			equalTo: slug
		})

		// this part is needed because emberfire: https://github.com/firebase/emberfire/issues/235
		.then((channels) => {
			return channels.findBy('slug', slug);
		});

		// initially returns the empty proxy
		// later the real model
		// return model;
	},

	// because we use slugs instead of ids in the url
	// tell ember what the 'slug' param maps to on our model
	serialize(model) {
		return { slug: model.get('slug') };
	},

	afterModel(model) {
		window.scrollTo(0, 0);
		document.title = model.get('title') + ' - Radio4000';
	},

	// renderTemplate() {
	// 	this._super();
	// 	// update contextual nav
	// 	this.render('contextual-navigation/cn-channel', {
	// 		into: 'application',
	// 		outlet: 'contextual-navigation'
	// 	});
	// },

	// Reset doc title when leaving the route
	deactivate() {
		document.title = 'Radio4000';
	}
});