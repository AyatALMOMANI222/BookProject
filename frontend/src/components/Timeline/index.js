import React from 'react';
import { Timeline, TimelineItem } from 'react-timeline';

function CustomTimeline() {
    return (
        <Timeline>
            <TimelineItem
                title="Event 1"
                subtitle="January 1, 2024"
                body="Details about the event that occurred on this date."
            />
            <TimelineItem
                title="Event 2"
                subtitle="February 15, 2024"
                body="Details about another event."
            />
            {/* أضف المزيد من العناصر حسب الحاجة */}
        </Timeline>
    );
}

export default CustomTimeline;
