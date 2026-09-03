import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  CreditCard,
  Plus,
  Crown,
  Film,
  Check,
  Edit2,
  Tag,
  Coins,
  X
} from 'lucide-react';

export const SubscriptionPlans = () => {
  const { plansList, addPlan, updatePlan, togglePlanStatus, addToast } = useApp();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);

  // Form State
  const [name, setName] = useState('');
  const [badge, setBadge] = useState('Most Popular');
  const [price, setPrice] = useState(5);
  const [originalPrice, setOriginalPrice] = useState(15);
  const [durationDays, setDurationDays] = useState(1);
  const [description, setDescription] = useState('');
  const [featuresText, setFeaturesText] = useState('100% Zero Video Ads\n1080p Full HD Stream\nNo Auto-Debit\nValid for 7 Days');
  const [isAdFree, setIsAdFree] = useState(true);
  const [hasLimitedAds, setHasLimitedAds] = useState(false);

  // Coupon state
  const [coupons, setCoupons] = useState([
    { code: 'WELCOME50', discount: 50, type: 'Percentage', usageCount: 4210, maxUsage: 10000, status: 'Active' },
    { code: 'WEEKENDPASS', discount: 2, type: 'Flat ₹', usageCount: 1840, maxUsage: 5000, status: 'Active' },
    { code: 'VIPCREATOR', discount: 30, type: 'Percentage', usageCount: 920, maxUsage: 2000, status: 'Active' },
  ]);
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponDiscount, setNewCouponDiscount] = useState(50);

  const handleOpenEdit = (plan) => {
    setEditingPlan(plan);
    setName(plan.name);
    setBadge(plan.badge || '');
    setPrice(plan.price);
    setOriginalPrice(plan.originalPrice || plan.price * 2);
    setDurationDays(plan.durationDays);
    setDescription(plan.description);
    setFeaturesText(plan.features.join('\n'));
    setIsAdFree(plan.isAdFree);
    setHasLimitedAds(plan.hasLimitedAds);
    setIsCreateModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsCreateModalOpen(false);
    setEditingPlan(null);
    setName('');
    setDescription('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const features = featuresText.split('\n').map(f => f.trim()).filter(Boolean);

    if (editingPlan) {
      updatePlan(editingPlan.id, {
        name,
        badge,
        price: Number(price),
        originalPrice: Number(originalPrice),
        durationDays: Number(durationDays),
        description,
        features,
        isAdFree,
        hasLimitedAds
      });
    } else {
      addPlan({
        name,
        badge,
        price: Number(price),
        originalPrice: Number(originalPrice),
        durationDays: Number(durationDays),
        description,
        features,
        isAdFree,
        hasLimitedAds
      });
    }
    handleCloseModal();
  };

  const handleAddCoupon = (e) => {
    e.preventDefault();
    if (!newCouponCode.trim()) return;
    setCoupons(prev => [
      ...prev,
      {
        code: newCouponCode.toUpperCase().trim(),
        discount: Number(newCouponDiscount),
        type: 'Percentage',
        usageCount: 0,
        maxUsage: 5000,
        status: 'Active'
      }
    ]);
    setNewCouponCode('');
    addToast({ title: 'Coupon Code Created', message: `Promo code ${newCouponCode.toUpperCase()} activated!`, type: 'success' });
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h2 className="text-2xl font-black font-display text-white flex items-center gap-2.5">
            <CreditCard className="w-6 h-6 text-amber-400" />
            Subscription Passes & Micro-Monetization Engine
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Configure dynamic ₹3 and ₹5 snackable passes, 7-day all-access tiers, coin bundles, and discount coupons
          </p>
        </div>

        <button
          onClick={() => {
            setEditingPlan(null);
            setIsCreateModalOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 text-black font-bold text-xs shadow-glow-gold transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Pass</span>
        </button>
      </div>

      {/* Subscription Passes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {plansList.map((plan) => (
          <div
            key={plan.id}
            className={`p-6 rounded-3xl border flex flex-col justify-between transition-all duration-300 relative group overflow-hidden ${
              plan.isMostPopular
                ? 'border-amber-400/80 bg-gradient-to-b from-[#1E1710] to-[#0D111A] shadow-glow-gold'
                : 'border-[#1E2638] bg-[#0D111A] hover:border-slate-700'
            }`}
          >
            {/* Top Glow & Badges */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                {plan.badge ? (
                  <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-black uppercase tracking-wider">
                    ★ {plan.badge}
                  </span>
                ) : (
                  <span></span>
                )}
                {plan.isBestExperience && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    Best Experience
                  </span>
                )}
              </div>

              {/* Title & Icon */}
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                  plan.isAdFree ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-slate-800 text-slate-300'
                }`}>
                  {plan.isAdFree ? <Crown className="w-5 h-5" /> : <Film className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white leading-tight">{plan.name}</h3>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {plan.durationDays === 1 ? 'Single Series Pass' : `${plan.durationDays} Days Access`}
                  </span>
                </div>
              </div>

              {/* Pricing in INR */}
              <div className="mt-4 flex items-baseline gap-2">
                {plan.originalPrice && (
                  <span className="text-sm font-bold text-rose-400 line-through font-mono">
                    ₹{plan.originalPrice}
                  </span>
                )}
                <span className="text-3xl font-black text-amber-400 font-display">
                  ₹{plan.price}
                </span>
                <span className="text-xs text-slate-400">/ pass</span>
              </div>

              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                {plan.description}
              </p>

              {/* Features List */}
              <div className="mt-5 space-y-2 border-t border-slate-800/80 pt-4">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                    <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Card Controls */}
            <div className="mt-6 pt-4 border-t border-slate-800/80 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 pb-1">
                <span>Active Subscribers</span>
                <span className="font-bold text-white font-mono">{plan.subscribersCount.toLocaleString()}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenEdit(plan)}
                  className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit Plan</span>
                </button>
                <button
                  onClick={() => togglePlanStatus(plan.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
                    plan.isActive
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      : 'bg-slate-800 text-slate-500 border-slate-700'
                  }`}
                >
                  {plan.isActive ? 'Active' : 'Paused'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 2-Column Section: Coin Bundles & Promo Coupon Codes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Coin Packs Configurator */}
        <div className="p-6 rounded-2xl bg-[#0D111A] border border-[#1E2638] shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Coins className="w-5 h-5 text-amber-400" />
              Creator Coins & Episode Unlock Bundles
            </h3>
            <span className="text-xs text-amber-400 font-mono font-semibold">1 Coin = ₹0.50</span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-center space-y-1">
              <span className="text-xs font-bold text-slate-400">Starter Pack</span>
              <div className="text-xl font-black text-amber-400 font-mono">50 Coins</div>
              <div className="text-xs font-bold text-white font-mono">₹29</div>
              <span className="text-[9px] text-emerald-400 block">+5 Bonus Coins</span>
            </div>

            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-center space-y-1 shadow-glow-gold">
              <span className="text-[10px] font-black uppercase text-amber-300">Hot Seller</span>
              <div className="text-xl font-black text-amber-300 font-mono">100 Coins</div>
              <div className="text-xs font-bold text-white font-mono">₹49</div>
              <span className="text-[9px] text-emerald-400 block">+15 Bonus Coins</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-center space-y-1">
              <span className="text-xs font-bold text-slate-400">Binge Titan</span>
              <div className="text-xl font-black text-amber-400 font-mono">250 Coins</div>
              <div className="text-xs font-bold text-white font-mono">₹99</div>
              <span className="text-[9px] text-emerald-400 block">+50 Bonus Coins</span>
            </div>
          </div>
        </div>

        {/* Promo Codes & Coupons Manager */}
        <div className="p-6 rounded-2xl bg-[#0D111A] border border-[#1E2638] shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Tag className="w-5 h-5 text-rose-400" />
              Promo Coupons & Discount Codes
            </h3>
            <span className="text-xs text-slate-400 font-medium">{coupons.length} Active Codes</span>
          </div>

          {/* Quick Add Coupon Form */}
          <form onSubmit={handleAddCoupon} className="flex gap-2 text-xs">
            <input
              type="text"
              required
              placeholder="CODE (e.g. DIWALI50)"
              value={newCouponCode}
              onChange={(e) => setNewCouponCode(e.target.value)}
              className="flex-1 bg-[#141A26] border border-slate-700 rounded-xl px-3 py-2 text-white font-mono uppercase focus:outline-none focus:border-amber-400"
            />
            <input
              type="number"
              min={5}
              max={100}
              value={newCouponDiscount}
              onChange={(e) => setNewCouponDiscount(Number(e.target.value))}
              className="w-20 bg-[#141A26] border border-slate-700 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-amber-400"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-500 text-black font-bold rounded-xl shadow-glow-gold"
            >
              Add Code
            </button>
          </form>

          {/* Coupons List */}
          <div className="divide-y divide-slate-800/80 text-xs">
            {coupons.map(coupon => (
              <div key={coupon.code} className="py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    {coupon.code}
                  </span>
                  <span className="text-slate-300 font-semibold">{coupon.discount}% Off</span>
                </div>
                <div className="flex items-center gap-4 text-slate-400 text-[11px]">
                  <span>{coupon.usageCount.toLocaleString()} Redeemed</span>
                  <span className="text-emerald-400 font-bold">{coupon.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Create / Edit Plan Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0D111A] border border-[#232C3E] rounded-3xl w-full max-w-xl shadow-2xl p-6 space-y-5 animate-scale-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-lg font-bold font-display text-white">
                {editingPlan ? 'Edit Pass Pricing & Features' : 'Create New Micro-Pass Tier'}
              </h3>
              <button
                onClick={handleCloseModal}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Plan / Pass Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Watch Ad Free (7-Day Pass)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#161C28] border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Pass Price (₹) *
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full bg-[#161C28] border border-slate-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-amber-400 font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Original Price (₹)
                  </label>
                  <input
                    type="number"
                    value={originalPrice}
                    onChange={(e) => setOriginalPrice(Number(e.target.value))}
                    className="w-full bg-[#161C28] border border-slate-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Duration (Days)
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={durationDays}
                    onChange={(e) => setDurationDays(Number(e.target.value))}
                    className="w-full bg-[#161C28] border border-slate-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Badge Title
                  </label>
                  <input
                    type="text"
                    placeholder="Most Popular / Saver Pass"
                    value={badge}
                    onChange={(e) => setBadge(e.target.value)}
                    className="w-full bg-[#161C28] border border-slate-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Ad Policy
                  </label>
                  <div className="flex items-center gap-4 pt-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isAdFree}
                        onChange={(e) => setIsAdFree(e.target.checked)}
                        className="w-4 h-4 rounded border-slate-700 text-amber-500 focus:ring-0"
                      />
                      <span className="text-xs text-white font-semibold">100% Ad-Free</span>
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Features (One per line)
                </label>
                <textarea
                  rows={4}
                  value={featuresText}
                  onChange={(e) => setFeaturesText(e.target.value)}
                  className="w-full bg-[#161C28] border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-amber-400 resize-none font-sans"
                />
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-black font-bold shadow-glow-gold"
                >
                  {editingPlan ? 'Save Changes' : 'Publish Pass'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
