type MenuItem = {
    name: string,
    icon: string,
    disabled?: boolean
}

const Topbar: React.FC<{ activePage: string; setActivePage: (page: string) => void }> = ({
                                                                                             activePage,
                                                                                             setActivePage,
                                                                                         }) => {
    const menuItems: MenuItem[] = [
        { name: 'Info', icon: '/icons/dreams.svg' },
        { name: 'Game', icon: '/icons/heart-hand.svg' },
        { name: 'Leaderboard', icon: '/icons/agent.png' },
    ];

    return (
        <div className="w-full bg-white border-b p-4 flex items-center justify-center space-x-6">
            {menuItems.map((item) => (
                <div
                    key={item.name}
                    className={`flex items-center space-x-2 cursor-pointer ${
                        activePage === item.name
                            ? 'text-blue-500'
                            : item.disabled
                                ? 'text-gray-400 cursor-not-allowed'
                                : 'text-gray-600 hover:text-gray-800'
                    }`}
                    onClick={() => !item.disabled && setActivePage(item.name)}
                >
                    <img
                        src={item.icon}
                        alt={`${item.name} icon`}
                        className={`h-5 w-5 ${
                            activePage === item.name ? 'filter-blue' : 'filter-gray'
                        }`}
                    />
                    <span className="text-sm font-medium">
            {item.name}
                        {item.disabled && <span className="text-xs ml-1">(maintenance)</span>}
          </span>
                </div>
            ))}
        </div>
    );
};

export default Topbar;
