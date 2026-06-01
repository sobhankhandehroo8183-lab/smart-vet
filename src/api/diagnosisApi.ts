const API_URL = 'http://localhost:5000';

// دریافت تاریخچه تشخیص‌های کاربر
export const getUserDiagnoses = async (userId: string) => {
  try {
    const response = await fetch(`${API_URL}/diagnoses?userId=${userId}&_sort=createdAt&_order=desc`);
    const diagnoses = await response.json();
    return { success: true, diagnoses };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// دریافت یک تشخیص
export const getDiagnosisById = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/diagnoses/${id}`);
    const diagnosis = await response.json();
    return { success: true, diagnosis };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// ذخیره تشخیص جدید (قبل از پرداخت)
export const saveDiagnosis = async (diagnosisData: any) => {
  try {
    const newDiagnosis = {
      id: Date.now().toString(),
      ...diagnosisData,
      isPaid: false,
      createdAt: new Date().toISOString()
    };

    const response = await fetch(`${API_URL}/diagnoses`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newDiagnosis)
    });

    const diagnosis = await response.json();
    return { success: true, diagnosis };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// پرداخت و فعال‌سازی تشخیص کامل
export const purchaseDiagnosis = async (diagnosisId: string, userId: string, price: number) => {
  try {
    // دریافت کاربر
    const userRes = await fetch(`${API_URL}/users/${userId}`);
    const user = await userRes.json();
    
    if (user.walletBalance < price) {
      return { success: false, error: 'موجودی کیف پول کافی نیست' };
    }
    
    // کاهش موجودی کیف پول
    await fetch(`${API_URL}/users/${userId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ walletBalance: user.walletBalance - price })
    });
    
    // به‌روزرسانی تشخیص به پرداخت شده
    await fetch(`${API_URL}/diagnoses/${diagnosisId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isPaid: true, paidAt: new Date().toISOString() })
    });
    
    // ثبت تراکنش
    await fetch(`${API_URL}/transactions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: Date.now().toString(),
        userId,
        amount: price,
        type: 'purchase',
        itemId: diagnosisId,
        itemType: 'diagnosis',
        status: 'success',
        createdAt: new Date().toISOString()
      })
    });
    
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// شبیه‌سازی تشخیص هوش مصنوعی (موقتی)
export const simulateAIDiagnosis = async (symptoms: string[], animalType: string, age: number) => {
  // اینجا بعداً به API واقعی هوش مصنوعی متصل می‌شود
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        disease: "عفونت تنفسی فوقانی (URI)",
        confidence: 94,
        description: "یک عفونت ویروسی یا باکتریایی که سیستم تنفسی فوقانی را درگیر می‌کند",
        urgency: "medium",
        medications: [
          {
            name: "آموکسی‌سیلین",
            dosage: `${20 * age}mg هر ۱۲ ساعت`,
            duration: "۷ روز",
            price: 45000
          }
        ],
        homeCare: [
          "استراحت کامل در محیط گرم",
          "دسترسی همیشگی به آب تازه",
          "غذای نرم و هضم‌پذیر"
        ]
      });
    }, 2000);
  });
};