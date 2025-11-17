import { Card } from "flowbite-react";

function MenuCard({ moduleData }) {
    let icon;
    switch (moduleData.icon) {
        case 'inventory':
            icon = 
            <svg
                width="32" height="32" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" className="text-gray-900 dark:text-white"
                strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
            >
                <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" />
                <path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
                <path d="M9 12l.01 0" />
                <path d="M13 12l2 0" />
                <path d="M9 16l.01 0" />
                <path d="M13 16l2 0" />
            </svg>
            break;
        case 'output':
            icon = 
            <svg
                width="32" height="32" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" className="text-gray-900 dark:text-white"
                strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
            >
                <path d="M12 9v-3.586a1 1 0 0 1 1.707 -.707l6.586 6.586a1 1 0 0 1 0 1.414l-6.586 6.586a1 1 0 0 1 -1.707 -.707v-3.586h-3v-6h3z" />
                <path d="M3 9v6" />
                <path d="M6 9v6" />
            </svg>
            break;
        case 'logbook':
            icon =
            <svg
                width="32" height="32" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" className="text-gray-900 dark:text-white"
                strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
            >
                <path d="M19 4v16h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12z" />
                <path d="M19 16h-12a2 2 0 0 0 -2 2" />
                <path d="M9 8h6" />
            </svg>
            break;
    }

    return (
        <a href="#">
            <Card className="max-w-sm">
                <div className="flex flex-col items-center">
                    {icon}
                    <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{moduleData.name}</h5>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{moduleData.description}</span>
                </div>
            </Card>
        </a>
    );
}
export default MenuCard