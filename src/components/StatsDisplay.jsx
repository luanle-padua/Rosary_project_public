import React, { useEffect, useState } from 'react';
import { Users } from 'lucide-react';

const StatsDisplay = () => {
    const [visitorCount, setVisitorCount] = useState(0);

    // Simpler increment function
    async function incrementVisitorCount() {
        try {
            const response = await fetch('/api/visitor', { method: 'POST' });
            const data = await response.json();
            if (data.success) {
                setVisitorCount(data.visitors);
            }
        } catch (error) {
            console.error('Failed to increment:', error);
        }
    }

    // Simpler get count function
    async function getVisitorCount() {
        try {
            const response = await fetch('/api/visitor');
            const data = await response.json();
            if (data.success) {
                setVisitorCount(data.visitors);
            }
        } catch (error) {
            console.error('Failed to get count:', error);
        }
    }

    useEffect(() => {
        // Increment on first visit
        incrementVisitorCount();

        // Poll for updates
        const interval = setInterval(getVisitorCount, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex items-center justify-center gap-2 text-white text-sm opacity-75">
            <Users size={16} />
            <span>
                {visitorCount.toLocaleString()} believer{visitorCount !== 1 ? 's' : ''} are praying together
            </span>
        </div>
    );
};

export default StatsDisplay;