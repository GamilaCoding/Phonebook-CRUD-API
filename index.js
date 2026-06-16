import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
const app = express();
const PORT = 3000;

app.use(express.json()); // النظارة السحرية لقراءة البيانات القادمة في الـ Body

// 1️⃣ رابط الاتصال بقاعدة البيانات (استبدلي الـ placeholders ببياناتك الحقيقية)
const MONGO_URI = process.env.MONGO_URI;

// 2️⃣ تصميم الرسم الهندسي (Schema) والـ Model للـ Contact
const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});
const Contact = mongoose.model('Contact', contactSchema);

// ==================== الـ ROUTES (تتعامل مع الداتابيز مباشرة) ====================

// 🟢 [GET] جلب كل الأسماء من قاعدة البيانات
app.get('/contacts', async (req, res) => {
    try {
        const contacts = await Contact.find(); // بتجيب كل الداتا من المونجو
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ message: "حدث خطأ أثناء جلب البيانات ❌", error });
    }
});

// 🔵 [GET by ID] جلب شخص محدد باستخدام الـ ID بتاعه
app.get('/contacts/:id', async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id); // الـ ID في المونجو بيكون String تلقائي
        if (contact) {
            res.json(contact);
        } else {
            res.status(404).json({ message: "الاسم غير موجود في دليل الهاتف! ❌" });
        }
    } catch (error) {
        res.status(500).json({ message: "الـ ID المبعوث غير صحيح أو حدث خطأ ⚠️", error });
    }
});

// 🟠 [POST] إضافة اسم ورقم جديد لحفظهم في السحاب بشكل دائم
app.post('/contacts', async (req, res) => {
    try {
        const newContact = new Contact({
            name: req.body.name,
            phone: req.body.phone
        });

        await newContact.save(); // حفظ في الداتابيز
        res.status(201).json({
            message: "تم حفظ الاسم بنجاح في قاعدة البيانات الحقيقية! 📱🚀",
            data: newContact
        });
    } catch (error) {
        res.status(400).json({ message: "فشل إضافة الاسم، تأكدي من إرسال الحقول المطلوبة ❌", error });
    }
});

// 🟡 [PUT] تعديل اسم أو رقم موجود بالفعل في الداتابيز
app.put('/contacts/:id', async (req, res) => {
    try {
        const updatedContact = await Contact.findByIdAndUpdate(
            req.params.id,
            { name: req.body.name, phone: req.body.phone },
            { new: true } // الخيار ده بيخلي الدالة ترجع لكِ العنصر "بعد" التعديل مش قبله
        );

        if (updatedContact) {
            res.json({ message: "تم تحديث البيانات في الداتابيز بنجاح! 🔄", data: updatedContact });
        } else {
            res.status(404).json({ message: "الاسم غير موجود لتعديله! ❌" });
        }
    } catch (error) {
        res.status(500).json({ message: "حدث خطأ أثناء التعديل ⚠️", error });
    }
});

// 🔴 [DELETE] حذف اسم نهائياً من قاعدة البيانات
app.delete('/contacts/:id', async (req, res) => {
    try {
        const deletedContact = await Contact.findByIdAndDelete(req.params.id);
        if (deletedContact) {
            res.json({ message: "تم حذف الاسم نهائياً من قاعدة البيانات! 🗑️" });
        } else {
            res.status(404).json({ message: "الاسم غير موجود أصلاً لحذفه! ❌" });
        }
    } catch (error) {
        res.status(500).json({ message: "حدث خطأ أثناء الحذف ⚠️", error });
    }
});

// ==================== الاتصال بالداتابيز وتأمين قيام السيرفر ====================
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("تم الاتصال بقاعدة بيانات MongoDB بنجاح! 🥳🔌");

        // السيرفر مش هيشتغل غير لما يتأكد إن الداتابيز فتحت أولاً
        app.listen(PORT, () => {
            console.log(`دليل الهواتف شغال أونلاين وبأمان على بورت ${PORT} 🚀`);
        });
    })
    .catch(err => {
        console.error("فشل الاتصال بالداتابيز يا هندسة! تأكدي من الباسورد والرابط ❌", err);
    });
