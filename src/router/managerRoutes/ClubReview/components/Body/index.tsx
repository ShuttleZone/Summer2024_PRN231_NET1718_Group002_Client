import {ReplyReview} from "@/@types/api";
// import {ReplyReview, ReviewRequest} from "@/@types/api";
import {Button} from "@/components/ui/button";
import {
    Dialog,
    // DialogClose,
    DialogContent,
    DialogDescription,
    // DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {useToast} from "@/components/ui/use-toast";
import {
    useGetClubReviewsQuery,
    useReplyClubReviewMutation,
} from "@/store/services/reviews/review.api";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import React, {useState} from "react";
import {useParams} from "react-router-dom";
import {skipToken} from "@reduxjs/toolkit/query";

function Ostar() {
    return (
        <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
            <svg
                className="w-4 h-4 text-yellow-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
            >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg
                className="w-4 h-4 text-gray-300 dark:text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
            >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg
                className="w-4 h-4 text-gray-300 dark:text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
            >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg
                className="w-4 h-4 text-gray-300 dark:text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
            >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg
                className="w-4 h-4 text-gray-300 dark:text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
            >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <br />
            {/* <h3 className="ms-2 text-sm font-semibold text-gray-900 dark:text-white">
                Thinking to buy another one!
            </h3> */}
        </div>
    );
}

function Tstar() {
    return (
        <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
            <svg
                className="w-4 h-4 text-yellow-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
            >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg
                className="w-4 h-4 text-yellow-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
            >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg
                className="w-4 h-4 text-gray-300 dark:text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
            >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg
                className="w-4 h-4 text-gray-300 dark:text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
            >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg
                className="w-4 h-4 text-gray-300 dark:text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
            >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <br />
            {/* <h3 className="ms-2 text-sm font-semibold text-gray-900 dark:text-white">
                Thinking to buy another one!
            </h3> */}
        </div>
    );
}

function Thstar() {
    return (
        <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
            <svg
                className="w-4 h-4 text-yellow-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
            >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg
                className="w-4 h-4 text-yellow-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
            >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg
                className="w-4 h-4 text-yellow-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
            >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg
                className="w-4 h-4 text-gray-300 dark:text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
            >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg
                className="w-4 h-4 text-gray-300 dark:text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
            >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <br />
            {/* <h3 className="ms-2 text-sm font-semibold text-gray-900 dark:text-white">
                Thinking to buy another one!
            </h3> */}
        </div>
    );
}

function Fstar() {
    return (
        <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
            <svg
                className="w-4 h-4 text-yellow-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
            >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg
                className="w-4 h-4 text-yellow-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
            >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg
                className="w-4 h-4 text-yellow-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
            >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg
                className="w-4 h-4 text-yellow-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
            >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg
                className="w-4 h-4 text-gray-300 dark:text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
            >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <br />
            {/* <h3 className="ms-2 text-sm font-semibold text-gray-900 dark:text-white">
                Thinking to buy another one!
            </h3> */}
        </div>
    );
}

function Fistar() {
    return (
        <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
            <svg
                className="w-4 h-4 text-yellow-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
            >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg
                className="w-4 h-4 text-yellow-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
            >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg
                className="w-4 h-4 text-yellow-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
            >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg
                className="w-4 h-4 text-yellow-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
            >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <svg
                className="w-4 h-4 text-yellow-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
            >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <br />
            {/* <h3 className="ms-2 text-sm font-semibold text-gray-900 dark:text-white">
                Thinking to buy another one!
            </h3> */}
        </div>
    );
}

function AllReviews() {
    const {Id} = useParams();

    const formatDateTime = (dateTime: string) => {
        const date = new Date(dateTime);
        return `${String(date.getDate()).padStart(2, "0")}-${String(date.getMonth() + 1).padStart(2, "0")}-${date.getFullYear()} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
    };

    const {
        data: reviews,
        isLoading,
        refetch,
    } = useGetClubReviewsQuery(Id || skipToken);
    const initialState: ReplyReview = {
        id: "",
        replyTitle: "",
        replyContent: "",
    };

    const {toast} = useToast();
    const [open, setOpen] = React.useState(false);
    const [formData, setFormData] = useState<ReplyReview>(initialState);
    const [replyReview] = useReplyClubReviewMutation();
    const handleSend = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const result = await replyReview(formData);
        setOpen(false);

        if (result.data != null) {
            toast({
                description: "Phản hồi của bạn đã được gửi đi !",
            });
            refetch();
            setFormData(initialState);
        } else {
            toast({
                variant: "destructive",
                title: "Uh oh! Lỗi rồi",
                description: "Có lỗi trong việc phản hồi lại đánh giá !",
            });
            refetch();
        }
    };
    if (isLoading) return <div>is loading...</div>;
    if (reviews?.length == 0) {
        return (
            <div>
                {" "}
                <p className="text-lg font-normal text-center p-4 text-gray-500 lg:text-xl dark:text-gray-400">
                    <strong className="font-semibold text-gray-900 dark:text-white">
                        Câu lạc bộ này chưa có đánh giá nào !
                    </strong>{" "}
                </p>
            </div>
        );
    }
    return (
        <>
            {reviews?.map((review) => {
                return (
                    <div className="border-2 rounded-lg p-4 m-2 border-green-500/50">
                        <article>
                            <div className="flex items-center mb-4">
                                {/* <img
                                    className="w-10 h-10 me-4 rounded-full"
                                    src="/docs/images/people/profile-picture-5.jpg"
                                    alt=""
                                /> */}
                                <div className="font-medium dark:text-white">
                                    <p>
                                        {review.createdBy}{" "}
                                        <time className="block text-sm text-gray-500 dark:text-gray-400">
                                            {formatDateTime(review.created)}
                                        </time>
                                    </p>
                                </div>
                            </div>
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                                {review.title}
                            </h3>
                            {review.rating == 1 ? (
                                Ostar()
                            ) : review.rating == 2 ? (
                                Tstar()
                            ) : review.rating == 3 ? (
                                Thstar()
                            ) : review.rating == 4 ? (
                                Fstar()
                            ) : review.rating == 5 ? (
                                Fistar()
                            ) : review.rating == 0 ? (
                                <div> Không có sao !</div>
                            ) : (
                                <div> Không có thông tin</div>
                            )}

                            <footer className="mb-5 text-sm text-gray-500 dark:text-gray-400">
                                <p>
                                    Đánh giá{" "}
                                    <strong> {review.clubName} </strong>
                                    vào lúc
                                    <time>
                                        <strong>
                                            {" "}
                                            {formatDateTime(review.created)}
                                        </strong>
                                    </time>
                                </p>
                            </footer>
                            <p className="mb-2 text-gray-500 dark:text-gray-400">
                                <blockquote className="p-4 my-4 border-s-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800">
                                    <p className="text-xl italic font-medium leading-relaxed text-gray-900 dark:text-white">
                                        " {review.comment}"
                                    </p>
                                </blockquote>
                            </p>
                            <aside>
                                <div className="flex items-center mt-3">
                                    {review.replyContent != null ? (
                                        <a
                                            aria-disabled
                                            className="px-2 py-1.5 text-xs font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                        >
                                            Đã phản hồi !
                                        </a>
                                    ) : (
                                        <Dialog
                                            open={open}
                                            onOpenChange={setOpen}
                                            key={review.id}
                                        >
                                            <DialogTrigger>
                                                <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger>
                                                            <button
                                                                value={
                                                                    review.id
                                                                }
                                                                onClick={(
                                                                    event
                                                                ) =>
                                                                    setFormData(
                                                                        (
                                                                            prev
                                                                        ) => ({
                                                                            ...prev,
                                                                            id: event
                                                                                .currentTarget
                                                                                .value,
                                                                        })
                                                                    )
                                                                }
                                                                data-tooltip-target="tooltip-default"
                                                                type="button"
                                                                className="px-4 py-2 text-xs font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                                            >
                                                                Phản hồi đánh
                                                                giá
                                                            </button>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>
                                                                Phản hồi đánh
                                                                giá này
                                                            </p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>
                                                        Phản hồi đánh giá này
                                                    </DialogTitle>
                                                    <DialogDescription>
                                                        Hãy để lại phản hồi cho
                                                        khách hàng !
                                                    </DialogDescription>
                                                </DialogHeader>

                                                <form onSubmit={handleSend}>
                                                    <div className="grid w-full gap-2 mt-2">
                                                        <Input
                                                            placeholder="Tiêu đề"
                                                            required
                                                            onChange={(event) =>
                                                                setFormData(
                                                                    (prev) => ({
                                                                        ...prev,
                                                                        replyTitle:
                                                                            event
                                                                                .target
                                                                                .value,
                                                                    })
                                                                )
                                                            }
                                                            value={
                                                                formData.replyTitle
                                                            }
                                                        />
                                                        <Textarea
                                                            placeholder="Bạn muốn nhắn điều gì ..."
                                                            required
                                                            onChange={(event) =>
                                                                setFormData(
                                                                    (prev) => ({
                                                                        ...prev,
                                                                        replyContent:
                                                                            event
                                                                                .target
                                                                                .value,
                                                                    })
                                                                )
                                                            }
                                                            value={
                                                                formData.replyContent
                                                            }
                                                        />
                                                        <Button type="submit">
                                                            Gửi câu phản hồi
                                                        </Button>
                                                    </div>
                                                </form>
                                            </DialogContent>
                                        </Dialog>
                                    )}{" "}
                                    <a
                                        href="#"
                                        className="ps-4 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500 border-gray-200 ms-4 border-s md:mb-0 dark:border-gray-600"
                                    >
                                        {" "}
                                    </a>
                                </div>
                            </aside>
                        </article>
                        {review.replyContent != null ? (
                            <div className="mt-2 ">
                                <div className="flex flex-col w-full leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-lg dark:bg-gray-700">
                                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                        {/* <img
                                            className="w-8 h-8 rounded-lg"
                                            src="src/assets/images/app-logo.png"
                                            // alt="Jese image"
                                        /> */}
                                        <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                            {review.replyPerson}
                                        </span>
                                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                            {formatDateTime(review.replyTime)}
                                        </span>
                                    </div>
                                    <p className="text-md font-bold py-2.5 text-gray-900 dark:text-white">
                                        {review.replyTitle}
                                    </p>
                                    <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
                                        {review.replyContent}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div></div>
                        )}
                    </div>
                );
            })}
        </>
    );
}

export default AllReviews;
