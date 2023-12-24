// Import necessary dependencies
"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { ShowMoreProps } from '@/types';
import { CustomButton } from '.';
import { updateSearchParams } from '@/utilis';

// Define the ShowMore component
const ShowMore = ({ pageNumber, isNext }: ShowMoreProps) => {
    // Access the Next.js router
    const router = useRouter();

    // Handle navigation when the "Show More" button is clicked
    const handleNavigation = () => {
        // Calculate the new limit based on the current page number
        const newLimit = (pageNumber + 1) * 10;

        // Update the limit parameter in the URL
        const newPathName = updateSearchParams("limit", `${newLimit}`);
        
        // Trigger navigation to the updated URL
        router.push(newPathName);
    };

    // Render the ShowMore component
    return (
        <div className='w-full flex-center gap-5 mt-10'>
            {/* Render the "Show More" button only if isNext is false */}
            {!isNext && (
                <CustomButton
                    title='Show More'
                    btnType='button'
                    containerStyles='bg-primary-blue rounded-full text-white'
                    handleClick={handleNavigation}
                />
            )}
        </div>
    );
};

// Export the ShowMore component
export default ShowMore;
