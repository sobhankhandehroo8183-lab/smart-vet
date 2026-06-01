import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { chargeWallet, getTransactionHistory } from '../api/paymentApi';
import { motion } from 'framer-motion';
import { FaWallet, FaPlus, FaHistory, FaCheckCircle, FaTimesCircle, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const WalletPage: React.FC = () => {
  const { user, refreshUserData } = useAuth();
  const [chargeAmount, setChargeAmount] = useState<number>(50000);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const chargeOptions = [50000, 100000, 200000, 500000];

  useEffect(() => {
    if (user) {
      loadTransactions();
    }
  }, [user]);

  const loadTransactions = async () => {
    if (!user) return;
    const result = await getTransactionHistory(user.id);
    if (result.success) {
      setTransactions(result.transactions);
    }
  };

  const handleCharge = async () => {
    if (!user) return;
    setLoading(true);
    const result = await chargeWallet(user.id, chargeAmount);
    if (result.success) {
      setMessage(`کیف پول شما با موفقیت ${chargeAmount.toLocaleString()} تومان شارژ شد`);
      await refreshUserData();
      await loadTransactions();
      setTimeout(() => setMessage(''), 3000);
    } else {
      setMessage('خطا در شارژ کیف پول');
    }
    setLoading(false);
  };

  const getTransactionIcon = (type: string) => {
    return type === 'charge' ? <FaArrowLeft className="text-green-500" /> : <FaArrowRight className="text-red-500" />;
  };

  const getTransactionTitle = (type: string) => {
    return type === 'charge' ? 'شارژ کیف پول' : 'خرید تشخیص';
  };

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">لطفاً وارد حساب کاربری خود شوید</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">کیف پول</h1>
        <p className="text-gray-600 mt-2">مدیریت موجودی و مشاهده تراکنش‌ها</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* کارت موجودی */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-3xl p-8 text-white"
        >
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-blue-100 text-sm">موجودی فعلی</p>
              <p className="text-4xl font-bold mt-2">{user.walletBalance.toLocaleString()} تومان</p>
            </div>
            <FaWallet className="w-12 h-12 opacity-50" />
          </div>

          <div className="border-t border-blue-400/30 pt-6 mt-6">
            <p className="text-blue-100 text-sm mb-4">مبلغ شارژ:</p>
            <div className="grid grid-cols-4 gap-3 mb-6">
              {chargeOptions.map(amount => (
                <button
                  key={amount}
                  onClick={() => setChargeAmount(amount)}
                  className={`py-2 rounded-xl font-medium transition-all ${
                    chargeAmount === amount
                      ? 'bg-white text-blue-600'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  {amount.toLocaleString()}
                </button>
              ))}
            </div>
            <button
              onClick={handleCharge}
              disabled={loading}
              className="w-full py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-100 transition-all flex items-center justify-center space-x-2 space-x-reverse"
            >
              <FaPlus />
              <span>{loading ? 'در حال پردازش...' : 'شارژ کیف پول'}</span>
            </button>
          </div>
        </motion.div>

        {/* پیام */}
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-100 text-green-700 p-4 rounded-xl"
          >
            {message}
          </motion.div>
        )}

        {/* تاریخچه تراکنش‌ها */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 bg-white rounded-2xl shadow-xl border p-6"
        >
          <div className="flex items-center space-x-2 space-x-reverse mb-6">
            <FaHistory className="w-5 h-5 text-gray-500" />
            <h2 className="text-xl font-semibold text-gray-800">تاریخچه تراکنش‌ها</h2>
          </div>

          {transactions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              تراکنشی یافت نشد
            </div>
          ) : (
            <div className="space-y-3">
              {transactions.map((transaction, index) => (
                <motion.div
                  key={transaction.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                >
                  <div className="flex items-center space-x-3 space-x-reverse">
                    {getTransactionIcon(transaction.type)}
                    <div>
                      <p className="font-medium text-gray-800">{getTransactionTitle(transaction.type)}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(transaction.createdAt).toLocaleDateString('fa-IR')}
                      </p>
                    </div>
                  </div>
                  <div className="text-left">
                    <p className={`font-bold ${transaction.type === 'charge' ? 'text-green-600' : 'text-red-600'}`}>
                      {transaction.type === 'charge' ? '+' : '-'}{transaction.amount.toLocaleString()} تومان
                    </p>
                    <p className="text-xs text-gray-500">{transaction.status === 'success' ? 'موفق' : 'ناموفق'}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default WalletPage;