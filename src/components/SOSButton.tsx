import { Phone, X } from "lucide-react";
import { useState } from "react";

const EMERGENCY_CONTACTS = [
  { name: "Women's Helpline", number: "1091" },
  { name: "Police", number: "100" },
  { name: "Ambulance", number: "108" },
  { name: "Legal Aid", number: "15100" },
];

export function SOSButton() {
  const [selectedNumber, setSelectedNumber] = useState<string | null>(null);

  const initiateCall = (number: string) => {
    // Opens native phone dialer app with the number
    window.location.href = `tel:${number}`;
  };

  const handleQuickCall = (number: string) => {
    setSelectedNumber(null);
    initiateCall(number);
  };

  return (
    <>
      {/* Button */}
      <button
        onClick={() => setSelectedNumber("menu")}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-white shadow-lg hover:bg-red-700 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
        aria-label="Emergency Services"
      >
        <Phone className="h-6 w-6" />
      </button>

      {/* Confirmation Dialog */}
      {selectedNumber && selectedNumber !== "menu" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-xs rounded-lg bg-white shadow-lg">
            <div className="border-b border-gray-200 px-6 py-4">
              <h2 className="text-base font-semibold text-gray-900">
                Confirm Call
              </h2>
            </div>
            <div className="px-6 py-4">
              <p className="text-sm text-gray-700 mb-4">
                Dialing:{" "}
                <span className="font-semibold text-red-600">
                  {selectedNumber}
                </span>
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedNumber(null)}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 font-medium rounded hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleQuickCall(selectedNumber)}
                  className="flex-1 px-4 py-2 bg-red-600 text-white font-medium rounded hover:bg-red-700 transition-colors"
                >
                  Call Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Service Menu */}
      {selectedNumber === "menu" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-xs rounded-lg bg-white shadow-lg">
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <h2 className="text-base font-semibold text-gray-900">
                Emergency Services
              </h2>
              <button
                onClick={() => setSelectedNumber(null)}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4 space-y-2">
              {EMERGENCY_CONTACTS.map((contact) => (
                <button
                  key={contact.number}
                  onClick={() => setSelectedNumber(contact.number)}
                  className="w-full flex items-center justify-between p-3 rounded border border-gray-200 hover:bg-red-50 hover:border-red-300 transition-colors text-left"
                >
                  <span className="font-medium text-gray-900">
                    {contact.name}
                  </span>
                  <span className="text-red-600 font-semibold">
                    {contact.number}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
