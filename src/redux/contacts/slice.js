import { createSelector, createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  addContactThunk,
  deleteContactThunk,
  editContactThunk,
  fetchContactsThunk,
} from "./operations";
import { selectFilter } from "../filters/slice";
import { logoutThunk } from "../auth/operations";
import toast from "react-hot-toast";

const initialState = {
  items: [],
  loading: false,
  error: null,
  selectedContactId: null,
  modalType: null,
  isModalOpen: false,
};

const slice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    setSelectedContactId: (state, action) => {
      state.selectedContactId = action.payload;
    },
    openModal: (state, action) => {
      state.isModalOpen = true;
    },
    closeModal: (state, action) => {
      state.isModalOpen = false;
      state.selectedContactId = null;
      state.modalType = null;
    },
    setModalType: (state, action) => {
      state.modalType = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContactsThunk.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(deleteContactThunk.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
        toast("Contact deleted 🗑️", {
          duration: 3000,
          style: { padding: "20px", fontSize: "18px" },
        });
      })
      .addCase(addContactThunk.fulfilled, (state, action) => {
        state.items.push(action.payload);
        toast("Contact added 🎉", {
          duration: 3000,
          style: { padding: "20px", fontSize: "18px" },
        });
      })
      .addCase(editContactThunk.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
          toast("Contact changed 🎉", {
            duration: 3000,
            style: { padding: "20px", fontSize: "18px" },
          });
        }
      })
      .addCase(logoutThunk.fulfilled, (state, action) => {
        return initialState;
      })
      .addMatcher(
        isAnyOf(
          fetchContactsThunk.pending,
          deleteContactThunk.pending,
          addContactThunk.pending,
          editContactThunk.pending
        ),
        (state) => {
          state.loading = true;
          state.error = false;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchContactsThunk.rejected,
          deleteContactThunk.rejected,
          addContactThunk.rejected,
          editContactThunk.rejected
        ),
        (state) => {
          state.loading = false;
          state.error = true;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchContactsThunk.fulfilled,
          deleteContactThunk.fulfilled,
          addContactThunk.fulfilled,
          editContactThunk.fulfilled
        ),
        (state) => {
          state.loading = false;
        }
      );
  },
});

export const selectContacts = (state) => state.contacts.items;
export const selectLoading = (state) => state.contacts.loading;
export const selectError = (state) => state.contacts.error;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) => {
    return contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(filter.toLowerCase()) ||
        contact.number.toLowerCase().includes(filter.toLowerCase())
    );
  }
);

export const contactsReducer = slice.reducer;

export const selectContactById = (state, contactId) => {
  return state.contacts.items.find((contact) => contact.id === contactId);
};

export const selectIsModalOpen = (state) => state.contacts.isModalOpen;

export const selectModalType = (state) => state.contacts.modalType;

export const selectSelectedContactId = (state) =>
  state.contacts.selectedContactId;

export const { setSelectedContactId, openModal, closeModal, setModalType } =
  slice.actions;
