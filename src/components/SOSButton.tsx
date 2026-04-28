import { Link } from "@tanstack/react-router";
import { Phone, X, AlertTriangle, PhoneCall, MessageCircle, MapPin } from "lucide-react";
import { useState } from "react";

const EMERGENCY_CONTACTS = [
  { name: "National Women's Helpline", number: "1091", description: "24/7 support for women in distress" },
  { name: "Police Emergency", number: "100", description: "Immediate police assistance" },
  { name: "Legal Aid Helpline", number: "15100", description: "Free legal advice" },
  { name: "Medical Emergency", number: "108", description: "Ambulance services" },
];

export function SOSButton() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleSOS = () => {
    setModalOpen(true);
  };

  const handleCall = (number: string) => {
    window.location.href = `tel:${number}`;
    setModalOpen(false);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      {/* SOS Button */}
      <button
        onClick={handleSOS}
        aria-label="Emergency SOS - Immediate help"
        className="sos-pulse fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center rounded-full bg-red-600 text-white shadow-lg transition-all hover:scale-110 hover:bg-red-700 focus-visible:ring-4 focus-visible:ring-red-300 focus-visible:outline-none"
      >
        <Phone className="h-6 w-6" />
        <span className="sr-only">SOS Emergency</span>
      </button>

      {/* SOS Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          />
          
          {/* Modal Content */}
          <div className="relative w-full max-w-md rounded-lg border border-red-500/30 bg-background shadow-2xl animate-in fade-in zoom-in duration-200">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border p-4 bg-red-600/10">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <h2 className="text-lg font-semibold text-foreground">Emergency SOS</h2>
              </div>
              <button
                onClick={handleClose}
                className="rounded-sm p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-4">
              <p className="mb-4 text-sm text-muted-foreground">
                You are about to request immediate help. Please select an option below:
              </p>

              <div className="space-y-3">
                {EMERGENCY_CONTACTS.map((contact) => (
                  <button
                    key={contact.number}
                    onClick={() => handleCall(contact.number)}
                    className="w-full rounded-sm border border-border p-3 text-left transition-all hover:border-red-500/30 hover:bg-red-500/5"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">{contact.name}</p>
                        <p className="text-xs text-muted-foreground">{contact.description}</p>
                      </div>
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-600/10">
                        <PhoneCall className="h-4 w-4 text-red-600" />
                      </div>
                    </div>
                    <p className="mt-1 text-sm font-mono text-red-600">{contact.number}</p>
                  </button>
                ))}
              </div>

              <div className="mt-4 rounded-sm bg-yellow-500/10 p-3">
                <div className="flex items-start gap-2">
                  <MessageCircle className="mt-0.5 h-4 w-4 text-yellow-600" />
                  <p className="text-xs text-yellow-800 dark:text-yellow-400">
                    If you can't speak, tap the button again and we'll send your location to emergency services.
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-border bg-muted/5 p-4">
              <button
                onClick={handleClose}
                className="w-full rounded-sm border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
