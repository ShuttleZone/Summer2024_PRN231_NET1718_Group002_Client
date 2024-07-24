import {TransactionResponseType} from "@/@types/api";
import commonApi from "@/store/common.api";

const transactionApi = commonApi.injectEndpoints({
    endpoints: (builder) => ({
        getMyTransactions: builder.query<TransactionResponseType[], void>({
            query: () => "/api/transactions?$orderby= Created desc",
            transformResponse: (response: {
                value: TransactionResponseType[];
            }) => {
                return response.value;
            },
        }),
    }),
});

export const {useGetMyTransactionsQuery} = transactionApi;
