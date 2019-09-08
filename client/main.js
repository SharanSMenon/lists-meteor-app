import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker'
import {routes, onAuthChange} from './../imports/routes/routes'
import { Session } from 'meteor/session'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faLock, faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons'
import './../imports/startup/simple-schema-configuration.js';
library.add(fab, faLock, faEnvelope, faKey)
Tracker.autorun(() => {
    const isAuthenticated = !!Meteor.userId();
    onAuthChange(isAuthenticated);
});

Meteor.startup(() => {
    const app = document.getElementById('app');
    ReactDOM.render(routes, app)
})