import {PayloadAction, createSelector, createSlice} from "@reduxjs/toolkit";
export interface BookingSlot {
    CourtId: string;
    CourtName: string;
    Date: string;
    StartTime: string;
    EndTime: string;
    Price: number;
}

interface BookingPersonInformation {
    Name: string;
    Email: string;
    Phone: string;
    Note: string;
}
interface ClubDetail {
    id: string;
    clubName: string;
    minDuration: number;
    openTime: string;
    closeTime: string;
    clubAddress: string;
    clubPhone: string;
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
        TotalPrice: number;
        Path: string;
    };
    PersonaInformation: {
        Id: 3;
        BookingPersonInformation: BookingPersonInformation;
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
    ClubDetail: ClubDetail;
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
        TotalPrice: 0,
        Path: "/time-date",
    },
    PersonaInformation: {
        Id: 3,
        BookingPersonInformation: {
            Name: "",
            Note: "",
            Phone: "",
            Email: "",
        },
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
    ClubDetail: {
        id: "",
        clubName: "",
        closeTime: "",
        openTime: "",
        minDuration: 0,
        clubAddress: "",
        clubPhone: "",
    },
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
        setBookingSlots(state, action) {
            state.TimeAndDate.Slots.push(action.payload);
        },
        setBookingTotalPrice(state, action) {
            console.log("can save");
            state.TimeAndDate.TotalPrice = action.payload;
        },
        removeBookingSlots(state, action) {
            const indexToRemove = state.TimeAndDate.Slots.findIndex(
                (slot) =>
                    slot.Date === action.payload.Date &&
                    slot.StartTime === action.payload.StartTime &&
                    slot.EndTime === action.payload.EndTime &&
                    slot.CourtName === action.payload.CourtName
            );

            if (indexToRemove !== -1) {
                state.TimeAndDate.Slots = [
                    ...state.TimeAndDate.Slots.slice(0, indexToRemove),
                    ...state.TimeAndDate.Slots.slice(indexToRemove + 1),
                ];
            }
        },
        setBookingPersonInformation(
            state,
            action: PayloadAction<{
                Name: string;
                Email: string;
                Phone: string;
                Note: string;
            }>
        ) {
            state.PersonaInformation.BookingPersonInformation = action.payload;
        },
        setClubDetail(state, action) {
            state.ClubDetail = action.payload;
        },

        clearBookingState: () => initialState,

        clearBookingSlots(state) {
            state.TimeAndDate.Slots = [];
        },
    },
});

// Selector function to get a stage by its ID
const selectStageById = createSelector(
    [
        (state: BookingStageState) => state,
        (_: BookingStageState, id: number) => id,
    ],
    (state, id) => {
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
export const {
    setStage,
    setTypeOfBooking,
    setBookingSlots,
    removeBookingSlots,
    setBookingPersonInformation,
    setBookingTotalPrice,
    setClubDetail,

    clearBookingState,

    clearBookingSlots,
} = bookingStageSlice.actions;
