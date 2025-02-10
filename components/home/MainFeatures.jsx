/**
 * MainFeatures component displays the three main value propositions of the platform
 * in a responsive grid layout. Each feature is presented in a card with hover effects.
 * 
 * Features highlighted:
 * - Zero Platform Fees
 * - Secure Transactions
 * - Exclusive Ownership
 * 
 * @returns {JSX.Element} A grid of three feature cards with titles and descriptions
 */
const MainFeatures = () => {
    return (
        <div className="max-w-6xl mx-auto py-20 px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Feature Card: Zero Platform Fees */}
            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
                <h3 className="text-2xl font-bold mb-4 text-blue-500">Zero Platform Fees</h3>
                <p className="text-gray-600 dark:text-gray-300">
                    Artists keep 100% of their sales. No hidden fees or commissions - maximize your earnings.
                </p>
            </div>
            {/* Feature Card: Secure Transactions */}
            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
                <h3 className="text-2xl font-bold mb-4 text-blue-500">Secure Transactions</h3>
                <p className="text-gray-600 dark:text-gray-300">
                    Protected payments and verified shipping ensure a safe buying experience for collectors.
                </p>
            </div>
            {/* Feature Card: Exclusive Ownership */}
            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
                <h3 className="text-2xl font-bold mb-4 text-blue-500">Exclusive Ownership</h3>
                <p className="text-gray-600 dark:text-gray-300">
                    Each artwork comes with verified licensing and authentication for single-owner exclusivity.
                </p>
            </div>
        </div>
    )
}

export default MainFeatures
