const API_URL = 'http://localhost:5000';

// دریافت موجودی کیف پول کاربر
export const getWalletBalance = async (userId: string) => {
  try {
    const response = await fetch(`${API_URL}/users/${userId}`);
    const user = await response.json();
    return { success: true, balance: user.walletBalance };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// شارژ کیف پول
export const chargeWallet = async (userId: string, amount: number) => {
  try {
    // دریافت کاربر
    const userRes = await fetch(`${API_URL}/users/${userId}`);
    const user = await userRes.json();
    
    // افزایش موجودی
    const newBalance = user.walletBalance + amount;
    await fetch(`${API_URL}/users/${userId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ walletBalance: newBalance })
    });
    
    // ثبت تراکنش
    await fetch(`${API_URL}/transactions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: Date.now().toString(),
        userId,
        amount,
        type: 'charge',
        status: 'success',
        createdAt: new Date().toISOString()
      })
    });
    
    // به‌روزرسانی localStorage
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    storedUser.walletBalance = newBalance;
    localStorage.setItem('user', JSON.stringify(storedUser));
    
    return { success: true, newBalance };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// دریافت تاریخچه تراکنش‌ها
export const getTransactionHistory = async (userId: string) => {
  try {
    const response = await fetch(`${API_URL}/transactions?userId=${userId}&_sort=createdAt&_order=desc`);
    const transactions = await response.json();
    return { success: true, transactions };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// شبیه‌سازی پرداخت آنلاین (بعداً به درگاه واقعی متصل می‌شود)
export const onlinePayment = async (amount: number, callbackUrl: string) => {
  // اینجا بعداً به زرین‌پال یا سایر درگاه‌ها متصل می‌شود
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        transactionId: Date.now().toString(),
        paymentUrl: callbackUrl
      });
    }, 1000);
  });
};