import {createSelector, createSlice} from "@reduxjs/toolkit";
interface BookingSlot {
    CourtName: string;
    Date: string;
    Duration: string;
}
interface BookingStageState {
    TypeOfBooking: {
        Id: 1;
        BookingType: string;
        Path: string;
    };
    TimeAndDate: {
        Id: 2;
        Slots: BookingSlot[];
        Path: string;
    };
    PersonaInformation: {
        Id: 3;
        CourtName: string;
        Slot: string;
        Path: string;
    };
    OrderConfirm: {
        Id: 4;
        CourtName: string;
        Slot: string;
        Path: string;
    };
    Payment: {
        Id: 5;
        CourtName: string;
        Slot: string;
        Path: string;
    };
    CurrentStage: number;
}

const initialState: BookingStageState = {
    TypeOfBooking: {
        Id: 1,
        BookingType: "",
        Path: "/",
    },
    TimeAndDate: {
        Id: 2,
        Slots: [],
        Path: "/time-date",
    },
    PersonaInformation: {
        Id: 3,
        CourtName: "",
        Slot: "",
        Path: "/personal-info",
    },
    OrderConfirm: {
        Id: 4,
        CourtName: "",
        Slot: "",
        Path: "/confirm",
    },
    Payment: {
        Id: 5,
        CourtName: "",
        Slot: "",
        Path: "/payment",
    },
    CurrentStage: 1,
};
const bookingStageSlice = createSlice({
    name: "bookingStage",
    initialState,
    reducers: {
        setTypeOfBooking(state, action) {
            state.TypeOfBooking.BookingType = action.payload.abc;
        },
        setStage(state, action) {
            state.CurrentStage = action.payload;
        },
    },
});

// Selector function to get a stage by its ID
const selectStageById = createSelector(
    [
        (state: BookingStageState, id: number) => id, // eslint-disable-line @typescript-eslint/no-unused-vars
        (state: BookingStageState) => state,
    ],
    (id, state) => {
        if (state.TypeOfBooking.Id === id) {
            return state.TypeOfBooking;
        }
        if (state.TimeAndDate.Id === id) {
            return state.TimeAndDate;
        }
        if (state.PersonaInformation.Id === id) {
            return state.PersonaInformation;
        }
        if (state.OrderConfirm.Id === id) {
            return state.OrderConfirm;
        }
        if (state.Payment.Id === id) {
            return state.Payment;
        }
        return null; // or undefined, or throw an error, depending on your needs
    }
);
export {selectStageById};
export default bookingStageSlice.reducer;
export const {setStage, setTypeOfBooking} = bookingStageSlice.actions;
