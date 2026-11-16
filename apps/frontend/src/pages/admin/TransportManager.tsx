import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { LoadingSkeleton } from '../../components/common/LoadingSkeleton';
import { Bus, MapPin, Phone, UserCheck, ShieldCheck, Users } from 'lucide-react';

export const TransportManager: React.FC = () => {
  const [routes, setRoutes] = useState<any[]>([]);
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([api.get('/transport/routes'), api.get('/transport/vehicles')])
      .then(([rtRes, vehRes]: any) => {
        setRoutes(rtRes.data);
        setVehicles(vehRes.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-appBorder p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900 tracking-tight">Transport & Bus Fleet Operations</h1>
          <p className="text-xs text-secondary-500 mt-1">
            GPS tracked bus routes, driver rosters, designated pickup halts, and student transit allocations
          </p>
        </div>
      </div>

      {loading ? (
        <LoadingSkeleton rows={6} />
      ) : (
        <div className="space-y-6">
          {/* Active Routes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {routes.map((rt) => (
              <div key={rt.id} className="bg-white rounded-2xl border border-appBorder p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center font-bold">
                      <Bus className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-secondary-900">{rt.routeName}</h3>
                      <p className="text-xs font-mono font-bold text-primary-600">Route Code: {rt.routeNumber}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700">
                    ₹{rt.fareMonthly}/mo
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-appBorder text-xs grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-secondary-400 font-semibold">Assigned Bus:</p>
                    <p className="font-bold text-secondary-900">{rt.vehicleNumber}</p>
                  </div>
                  <div>
                    <p className="text-secondary-400 font-semibold">Driver in Charge:</p>
                    <p className="font-bold text-secondary-900">{rt.driverName}</p>
                    <p className="text-[10px] text-secondary-500">{rt.driverPhone}</p>
                  </div>
                </div>

                <div className="space-y-2 border-t border-appBorder pt-3">
                  <p className="text-[11px] font-bold text-secondary-400 uppercase tracking-wider">Scheduled Pickup Halts</p>
                  <div className="space-y-1.5">
                    {(rt.stops || []).map((stop: any, idx: number) => (
                      <div key={idx} className="flex items-center justify-between text-xs py-1 px-2 rounded bg-slate-50">
                        <span className="flex items-center gap-1.5 text-secondary-800 font-medium">
                          <MapPin className="w-3.5 h-3.5 text-primary-500" />
                          <span>{stop.stopName}</span>
                        </span>
                        <span className="font-mono text-secondary-500">Pick {stop.pickupTime} • Drop {stop.dropTime}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

