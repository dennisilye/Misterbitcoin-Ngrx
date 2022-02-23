import { SET_LOADING, LOADED_CONTACTS, REMOVED_CONTACT, ADDED_CONTACT, UPDATED_CONTACT, LOADED_CONTACT, SET_ERROR } from '../actions/item.actions';
import { Contact } from 'src/app/models/contact.model';

export interface ItemState {
  contacts: Contact[];
  contact: Contact | null;
  isLoading: boolean;
  error: string;
}

const initialState: ItemState = {
  contacts: [],
  contact: null,
  isLoading: false,
  error: ''
};

export function reducer(state: ItemState = initialState, action: any): ItemState {
  switch (action.type) {
    case SET_LOADING: {
      const { isLoading } = action;
      console.log(`Reducer: Setting isLoading to ${isLoading}`);
      return { ...state, isLoading, error: '' };
    }
    case SET_ERROR: {
      const { error } = action;
      console.log(`Reducer: Setting item error`, error);
      return { ...state, error, isLoading: false };
    }
    case LOADED_CONTACTS: {
      const { contacts } = action;
      console.log(`Reducer: Setting loaded items (${contacts.length}) items`);
      return { ...state, contacts, isLoading: false, error: '' };
    }
    case LOADED_CONTACT: {
      const { contact } = action;
      console.log(`Reducer: Setting loaded item ${contact._id}`);
      return { ...state, contact, error: '' };

    }
    case REMOVED_CONTACT: {
      const { contactId } = action;
      console.log('Reducer: Removing item:', contactId);
      const contacts = state.contacts.filter(contact => contact._id !== contactId)
      return { ...state, contacts, error: '' };

    }
    case ADDED_CONTACT: {
      const { contact } = action;
      console.log('Reducer: Adding item:', contact);
      const contacts = [...state.contacts, contact]
      return { ...state, contacts, error: '' };
    }
    case UPDATED_CONTACT: {
      const { contact } = action;
      console.log('Reducer: Updating item:', contact);
      const contacts = state.contacts.map(currItem => (currItem._id === contact._id) ? contact : currItem)
      return { ...state, contacts, contact: null, error: '' };
    }
    default:
      return state;
  }
}
