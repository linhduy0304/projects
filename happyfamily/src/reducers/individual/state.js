

const {Record} = require('immutable');
const {
  INDIVIDUAL
} = require('../../config/actionTypes');

var InitialState = Record({
  state: INDIVIDUAL,
  loading: null,
  individual: null,
  loadingRelationship: null,
  relationships: null,
  itemEditing: null,
  loadingItemEditing: null,
});

export default InitialState;

