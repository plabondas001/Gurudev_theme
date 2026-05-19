import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import {
  ArrowLeft,
  BadgeCheck,
  MapPin,
  PackageCheck,
  Truck,
  Plus,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useUserData } from "../context/UserDataContext";
import { usePlaceOrder } from "../hooks/usePlaceOrder";
import {
  computeCartTotals,
  getCurrencySymbol,
  parsePrice,
} from "../utils/orderUtils";

/* ─── helpers ─────────────────────────────────────────────── */
const formatWithSymbol = (amount, symbol) => {
  const formatted =
    amount % 1 === 0
      ? amount.toLocaleString("en-US")
      : amount.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
  return symbol ? `${symbol} ${formatted}` : formatted;
};

const emptyForm = {
  fullName: "",
  phone: "",
  email: "",
  addressLine: "",
  division: "",
  district: "",
  subDistrict: "",
  note: "",
};

const districtsByDivision = {
  Barishal: [
    "Barguna",
    "Barishal",
    "Bhola",
    "Jhalokati",
    "Patuakhali",
    "Pirojpur",
  ],
  Chattogram: [
    "Bandarban",
    "Brahmanbaria",
    "Chandpur",
    "Chattogram",
    "Cox's Bazar",
    "Cumilla",
    "Feni",
    "Khagrachhari",
    "Lakshmipur",
    "Noakhali",
    "Rangamati",
  ],
  Dhaka: [
    "Dhaka",
    "Faridpur",
    "Gazipur",
    "Gopalganj",
    "Kishoreganj",
    "Madaripur",
    "Manikganj",
    "Munshiganj",
    "Narayanganj",
    "Narsingdi",
    "Rajbari",
    "Shariatpur",
    "Tangail",
  ],
  Khulna: [
    "Bagerhat",
    "Chuadanga",
    "Jashore",
    "Jhenaidah",
    "Khulna",
    "Kushtia",
    "Magura",
    "Meherpur",
    "Narail",
    "Satkhira",
  ],
  Mymensingh: ["Jamalpur", "Mymensingh", "Netrokona", "Sherpur"],
  Rajshahi: [
    "Bogura",
    "Joypurhat",
    "Naogaon",
    "Natore",
    "Chapainawabganj",
    "Pabna",
    "Rajshahi",
    "Sirajganj",
  ],
  Rangpur: [
    "Dinajpur",
    "Gaibandha",
    "Kurigram",
    "Lalmonirhat",
    "Nilphamari",
    "Panchagarh",
    "Rangpur",
    "Thakurgaon",
  ],
  Sylhet: ["Habiganj", "Moulvibazar", "Sunamganj", "Sylhet"],
};

const subDistrictsByDistrict = {
  Cumilla: [
    "Barura",
    "Brahmanpara",
    "Burichang",
    "Chandina",
    "Chauddagram",
    "Comilla Sadar",
    "Daudkandi",
    "Debidwar",
    "Homna",
    "Laksam",
    "Lalmai",
    "Meghna",
    "Monohargonj",
    "Muradnagar",
    "Nangalkot",
    "Sadarsouth",
    "Titas",
  ],
  Feni: [
    "Chhagalnaiya",
    "Daganbhuiyan",
    "Feni Sadar",
    "Fulgazi",
    "Parshuram",
    "Sonagazi",
  ],
  Brahmanbaria: [
    "Akhaura",
    "Ashuganj",
    "Bancharampur",
    "Bijoynagar",
    "Brahmanbaria Sadar",
    "Kasba",
    "Nabinagar",
    "Nasirnagar",
    "Sarail",
  ],
  Rangamati: [
    "Baghaichari",
    "Barkal",
    "Belaichari",
    "Juraichari",
    "Kaptai",
    "Kawkhali",
    "Langadu",
    "Naniarchar",
    "Rajasthali",
    "Rangamati Sadar",
  ],
  Noakhali: [
    "Begumganj",
    "Chatkhil",
    "Companiganj",
    "Hatia",
    "Kabirhat",
    "Noakhali Sadar",
    "Senbug",
    "Sonaimori",
    "Subarnachar",
  ],
  Chandpur: [
    "Chandpur Sadar",
    "Faridgonj",
    "Haimchar",
    "Hajiganj",
    "Kachua",
    "Matlab North",
    "Matlab South",
    "Shahrasti",
  ],
  Lakshmipur: [
    "Kamalnagar",
    "Lakshmipur Sadar",
    "Raipur",
    "Ramganj",
    "Ramgati",
  ],
  Chattogram: [
    "Anwara",
    "Banshkhali",
    "Boalkhali",
    "Chandanaish",
    "Fatikchhari",
    "Hathazari",
    "Karnafuli",
    "Lohagara",
    "Mirsharai",
    "Patiya",
    "Rangunia",
    "Raozan",
    "Sandwip",
    "Satkania",
    "Sitakunda",
  ],
  "Cox's Bazar": [
    "Chakaria",
    "Coxsbazar Sadar",
    "Eidgaon",
    "Kutubdia",
    "Moheshkhali",
    "Pekua",
    "Ramu",
    "Teknaf",
    "Ukhiya",
  ],
  Khagrachhari: [
    "Dighinala",
    "Guimara",
    "Khagrachhari Sadar",
    "Laxmichhari",
    "Manikchari",
    "Matiranga",
    "Mohalchari",
    "Panchari",
    "Ramgarh",
  ],
  Bandarban: [
    "Alikadam",
    "Bandarban Sadar",
    "Lama",
    "Naikhongchhari",
    "Rowangchhari",
    "Ruma",
    "Thanchi",
  ],
  Sirajganj: [
    "Belkuchi",
    "Chauhali",
    "Kamarkhand",
    "Kazipur",
    "Raigonj",
    "Shahjadpur",
    "Sirajganj Sadar",
    "Tarash",
    "Ullapara",
  ],
  Pabna: [
    "Atghoria",
    "Bera",
    "Bhangura",
    "Chatmohar",
    "Faridpur",
    "Ishurdi",
    "Pabna Sadar",
    "Santhia",
    "Sujanagar",
  ],
  Bogura: [
    "Adamdighi",
    "Bogra Sadar",
    "Dhunot",
    "Dupchanchia",
    "Gabtali",
    "Kahaloo",
    "Nondigram",
    "Shajahanpur",
    "Shariakandi",
    "Sherpur",
    "Shibganj",
    "Sonatala",
  ],
  Rajshahi: [
    "Bagha",
    "Bagmara",
    "Charghat",
    "Durgapur",
    "Godagari",
    "Mohonpur",
    "Paba",
    "Puthia",
    "Tanore",
  ],
  Natore: [
    "Bagatipara",
    "Baraigram",
    "Gurudaspur",
    "Lalpur",
    "Naldanga",
    "Natore Sadar",
    "Singra",
  ],
  Joypurhat: ["Akkelpur", "Joypurhat Sadar", "Kalai", "Khetlal", "Panchbibi"],
  Chapainawabganj: [
    "Bholahat",
    "Chapainawabganj Sadar",
    "Gomostapur",
    "Nachol",
    "Shibganj",
  ],
  Naogaon: [
    "Atrai",
    "Badalgachi",
    "Dhamoirhat",
    "Manda",
    "Mohadevpur",
    "Naogaon Sadar",
    "Niamatpur",
    "Patnitala",
    "Porsha",
    "Raninagar",
    "Sapahar",
  ],
  Jashore: [
    "Abhaynagar",
    "Bagherpara",
    "Chougachha",
    "Jessore Sadar",
    "Jhikargacha",
    "Keshabpur",
    "Manirampur",
    "Sharsha",
  ],
  Satkhira: [
    "Assasuni",
    "Debhata",
    "Kalaroa",
    "Kaliganj",
    "Satkhira Sadar",
    "Shyamnagar",
    "Tala",
  ],
  Meherpur: ["Gangni", "Meherpur Sadar", "Mujibnagar"],
  Narail: ["Kalia", "Lohagara", "Narail Sadar"],
  Chuadanga: ["Alamdanga", "Chuadanga Sadar", "Damurhuda", "Jibannagar"],
  Kushtia: [
    "Bheramara",
    "Daulatpur",
    "Khoksa",
    "Kumarkhali",
    "Kushtia Sadar",
    "Mirpur",
  ],
  Magura: ["Magura Sadar", "Mohammadpur", "Shalikha", "Sreepur"],
  Khulna: [
    "Botiaghata",
    "Dakop",
    "Digholia",
    "Dumuria",
    "Fultola",
    "Koyra",
    "Paikgasa",
    "Rupsha",
    "Terokhada",
  ],
  Bagerhat: [
    "Bagerhat Sadar",
    "Chitalmari",
    "Fakirhat",
    "Kachua",
    "Mollahat",
    "Mongla",
    "Morrelganj",
    "Rampal",
    "Sarankhola",
  ],
  Jhenaidah: [
    "Harinakundu",
    "Jhenaidah Sadar",
    "Kaliganj",
    "Kotchandpur",
    "Moheshpur",
    "Shailkupa",
  ],
  Jhalokati: ["Jhalakathi Sadar", "Kathalia", "Nalchity", "Rajapur"],
  Patuakhali: [
    "Bauphal",
    "Dashmina",
    "Dumki",
    "Galachipa",
    "Kalapara",
    "Mirzaganj",
    "Patuakhali Sadar",
    "Rangabali",
  ],
  Pirojpur: [
    "Bhandaria",
    "Indurkani",
    "Kawkhali",
    "Mathbaria",
    "Nazirpur",
    "Nesarabad",
    "Pirojpur Sadar",
  ],
  Barishal: [
    "Agailjhara",
    "Babuganj",
    "Bakerganj",
    "Banaripara",
    "Barisal Sadar",
    "Gournadi",
    "Hizla",
    "Mehendiganj",
    "Muladi",
    "Wazirpur",
  ],
  Bhola: [
    "Bhola Sadar",
    "Borhanuddin",
    "Charfesson",
    "Doulatkhan",
    "Lalmohan",
    "Monpura",
    "Tazumuddin",
  ],
  Barguna: [
    "Amtali",
    "Bamna",
    "Barguna Sadar",
    "Betagi",
    "Pathorghata",
    "Taltali",
  ],
  Sylhet: [
    "Balaganj",
    "Beanibazar",
    "Bishwanath",
    "Companiganj",
    "Dakshinsurma",
    "Fenchuganj",
    "Golapganj",
    "Gowainghat",
    "Jaintiapur",
    "Kanaighat",
    "Osmaninagar",
    "Sylhet Sadar",
    "Zakiganj",
  ],
  Moulvibazar: [
    "Barlekha",
    "Juri",
    "Kamolganj",
    "Kulaura",
    "Moulvibazar Sadar",
    "Rajnagar",
    "Sreemangal",
  ],
  Habiganj: [
    "Ajmiriganj",
    "Bahubal",
    "Baniachong",
    "Chunarughat",
    "Habiganj Sadar",
    "Lakhai",
    "Madhabpur",
    "Nabiganj",
    "Shaistaganj",
  ],
  Sunamganj: [
    "Bishwambarpur",
    "Chhatak",
    "Derai",
    "Dharmapasha",
    "Dowarabazar",
    "Jagannathpur",
    "Jamalganj",
    "Madhyanagar",
    "Shalla",
    "Shantiganj",
    "Sunamganj Sadar",
    "Tahirpur",
  ],
  Narsingdi: [
    "Belabo",
    "Monohardi",
    "Narsingdi Sadar",
    "Palash",
    "Raipura",
    "Shibpur",
  ],
  Gazipur: ["Gazipur Sadar", "Kaliakair", "Kaliganj", "Kapasia", "Sreepur"],
  Shariatpur: [
    "Bhedarganj",
    "Damudya",
    "Gosairhat",
    "Naria",
    "Shariatpur Sadar",
    "Zajira",
  ],
  Narayanganj: [
    "Araihazar",
    "Bandar",
    "Narayanganj Sadar",
    "Rupganj",
    "Sonargaon",
  ],
  Tangail: [
    "Basail",
    "Bhuapur",
    "Delduar",
    "Dhanbari",
    "Ghatail",
    "Gopalpur",
    "Kalihati",
    "Madhupur",
    "Mirzapur",
    "Nagarpur",
    "Sakhipur",
    "Tangail Sadar",
  ],
  Kishoreganj: [
    "Austagram",
    "Bajitpur",
    "Bhairab",
    "Hossainpur",
    "Itna",
    "Karimgonj",
    "Katiadi",
    "Kishoreganj Sadar",
    "Kuliarchar",
    "Mithamoin",
    "Nikli",
    "Pakundia",
    "Tarail",
  ],
  Manikganj: [
    "Doulatpur",
    "Gior",
    "Harirampur",
    "Manikganj Sadar",
    "Saturia",
    "Shibaloy",
    "Singiar",
  ],
  Dhaka: ["Dhamrai", "Dohar", "Keraniganj", "Nawabganj", "Savar"],
  Munshiganj: [
    "Gajaria",
    "Louhajanj",
    "Munshiganj Sadar",
    "Sirajdikhan",
    "Sreenagar",
    "Tongibari",
  ],
  Rajbari: ["Baliakandi", "Goalanda", "Kalukhali", "Pangsa", "Rajbari Sadar"],
  Madaripur: ["Dasar", "Kalkini", "Madaripur Sadar", "Rajoir", "Shibchar"],
  Gopalganj: [
    "Gopalganj Sadar",
    "Kashiani",
    "Kotalipara",
    "Muksudpur",
    "Tungipara",
  ],
  Faridpur: [
    "Alfadanga",
    "Bhanga",
    "Boalmari",
    "Charbhadrasan",
    "Faridpur Sadar",
    "Madhukhali",
    "Nagarkanda",
    "Sadarpur",
    "Saltha",
  ],
  Panchagarh: ["Atwari", "Boda", "Debiganj", "Panchagarh Sadar", "Tetulia"],
  Dinajpur: [
    "Birampur",
    "Birganj",
    "Birol",
    "Bochaganj",
    "Chirirbandar",
    "Dinajpur Sadar",
    "Fulbari",
    "Ghoraghat",
    "Hakimpur",
    "Kaharol",
    "Khansama",
    "Nawabganj",
    "Parbatipur",
  ],
  Lalmonirhat: [
    "Aditmari",
    "Hatibandha",
    "Kaliganj",
    "Lalmonirhat Sadar",
    "Patgram",
  ],
  Nilphamari: [
    "Dimla",
    "Domar",
    "Jaldhaka",
    "Kishorganj",
    "Nilphamari Sadar",
    "Syedpur",
  ],
  Gaibandha: [
    "Gaibandha Sadar",
    "Gobindaganj",
    "Palashbari",
    "Phulchari",
    "Sadullapur",
    "Saghata",
    "Sundarganj",
  ],
  Thakurgaon: [
    "Baliadangi",
    "Haripur",
    "Pirganj",
    "Ranisankail",
    "Thakurgaon Sadar",
  ],
  Rangpur: [
    "Badargonj",
    "Gangachara",
    "Kaunia",
    "Mithapukur",
    "Pirgacha",
    "Pirgonj",
    "Rangpur Sadar",
    "Taragonj",
  ],
  Kurigram: [
    "Bhurungamari",
    "Charrajibpur",
    "Chilmari",
    "Kurigram Sadar",
    "Nageshwari",
    "Phulbari",
    "Rajarhat",
    "Rowmari",
    "Ulipur",
  ],
  Sherpur: ["Jhenaigati", "Nalitabari", "Nokla", "Sherpur Sadar", "Sreebordi"],
  Mymensingh: [
    "Bhaluka",
    "Dhobaura",
    "Fulbaria",
    "Gafargaon",
    "Gouripur",
    "Haluaghat",
    "Iswarganj",
    "Muktagacha",
    "Mymensingh Sadar",
    "Nandail",
    "Phulpur",
    "Tarakanda",
    "Trishal",
  ],
  Jamalpur: [
    "Bokshiganj",
    "Dewangonj",
    "Islampur",
    "Jamalpur Sadar",
    "Madarganj",
    "Melandah",
    "Sarishabari",
  ],
  Netrokona: [
    "Atpara",
    "Barhatta",
    "Durgapur",
    "Kalmakanda",
    "Kendua",
    "Khaliajuri",
    "Madan",
    "Mohongonj",
    "Netrokona Sadar",
    "Purbadhala",
  ],
};

const getAddressLocation = (form) =>
  [form.division, form.district, form.subDistrict].filter(Boolean).join(", ");

/* ─── sub-components ──────────────────────────────────────── */
const StepBadge = ({ number, label, active, done }) => (
  <div className="flex items-center gap-2">
    <div
      className={`relative flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all duration-300 ${
        done
          ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
          : active
            ? "bg-primary text-white shadow-lg shadow-primary/40"
            : "bg-zinc-100 text-zinc-400"
      }`}
    >
      {done ? "✓" : number}
      {active && (
        <span className="absolute inset-0 animate-ping rounded-full bg-primary/30" />
      )}
    </div>
    <span
      className={`hidden text-xs font-semibold sm:block ${
        active ? "text-[#FBBC05]" : done ? "text-[#FBBC05]" : "text-zinc-400"
      }`}
    >
      {label}
    </span>
  </div>
);

const FieldLabel = ({ children }) => (
  <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-widest text-zinc-400">
    {children}
  </label>
);

const Input = ({ className = "", ...props }) => (
  <input
    className={`w-full rounded-2xl border border-zinc-200 bg-zinc-50/60 px-4 py-3.5 text-sm text-zinc-900 outline-none ring-0 transition-all duration-200 placeholder:text-zinc-400 focus:border-primary/60 focus:bg-white focus:shadow-[0_0_0_4px_rgb(var(--color-primary-rgb)/0.08)] focus:ring-0 ${className}`}
    {...props}
  />
);

const Textarea = ({ className = "", ...props }) => (
  <textarea
    className={`w-full resize-y rounded-2xl border border-zinc-200 bg-zinc-50/60 px-4 py-3.5 text-sm text-zinc-900 outline-none transition-all duration-200 placeholder:text-zinc-400 focus:border-primary/60 focus:bg-white focus:shadow-[0_0_0_4px_rgb(var(--color-primary-rgb)/0.08)] focus:ring-0 ${className}`}
    {...props}
  />
);

const Select = ({ className = "", children, ...props }) => (
  <select
    className={`w-full rounded-2xl border border-zinc-200 bg-zinc-50/60 px-4 py-3.5 text-sm text-zinc-900 outline-none ring-0 transition-all duration-200 focus:border-primary/60 focus:bg-white focus:shadow-[0_0_0_4px_rgb(var(--color-primary-rgb)/0.08)] focus:ring-0 disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
    {...props}
  >
    {children}
  </select>
);

/* ─── main component ──────────────────────────────────────── */
const Checkout = () => {
  const { user } = useAuth();
  const { cartItems } = useCart();
  const { addresses, addAddress } = useUserData();
  const placeOrder = usePlaceOrder();

  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [paymentDetails, setPaymentDetails] = useState({
    paidFrom: "",
    transactionId: "",
    amount: "",
  });
  const [voucherCode, setVoucherCode] = useState("");
  const [saveAddress, setSaveAddress] = useState(false);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  const subtotal = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) => sum + parsePrice(item.price) * (item.quantity || 1),
        0,
      ),
    [cartItems],
  );
  const shipping = 0;
  const discount = 0;
  const total = subtotal + shipping - discount;
  const currencySymbol =
    getCurrencySymbol(cartItems[0]?.price || "") ||
    computeCartTotals(cartItems).currencySymbol;

  const deliveryStepComplete = Boolean(
    form.fullName.trim() &&
    /^\d{8,15}$/.test(form.phone.trim()) &&
    form.addressLine.trim() &&
    (selectedAddressId || (form.division && form.district && form.subDistrict)),
  );
  const paymentStepComplete =
    paymentMethod === "cod" ||
    Boolean(
      paymentDetails.paidFrom.trim() &&
      paymentDetails.transactionId.trim() &&
      paymentDetails.amount.trim(),
    );
  const activeStep = !deliveryStepComplete ? 1 : paymentStepComplete ? 3 : 2;

  const updateForm = (field, value) => {
    setSelectedAddressId("");
    setForm((c) => ({
      ...c,
      [field]: value,
      ...(field === "division" ? { district: "", subDistrict: "" } : {}),
      ...(field === "district" ? { subDistrict: "" } : {}),
    }));
  };

  const updatePaymentDetails = (field, value) => {
    setPaymentDetails((c) => ({ ...c, [field]: value }));
  };

  const applyAddress = (address) => {
    setSelectedAddressId(address.id);
    setForm((c) => ({
      ...c,
      fullName: address.fullName || user?.name || "",
      phone: address.phone || user?.phone || "",
      email: c.email || user?.email || "",
      addressLine: address.addressLine || "",
      division: "",
      district: "",
      subDistrict: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!cartItems.length) return toast.error("Your cart is empty.");
    if (!form.fullName.trim())
      return toast.error("Please enter recipient name.");
    if (!/^\d{8,15}$/.test(form.phone.trim()))
      return toast.error("Please enter a valid phone number.");
    if (!form.addressLine.trim())
      return toast.error("Please complete the delivery address.");
    if (
      !selectedAddressId &&
      (!form.division || !form.district || !form.subDistrict)
    )
      return toast.error("Please select division, district, and sub district.");

    if (saveAddress && user?.id && !selectedAddressId) {
      addAddress(user.id, {
        label: "Checkout",
        fullName: form.fullName,
        phone: form.phone,
        addressLine: form.addressLine,
        city: getAddressLocation(form),
        isDefault: addresses.length === 0,
      });
    }
    placeOrder();
  };

  /* ── empty cart ── */
  if (cartItems.length === 0) {
    return (
      <section className="flex min-h-[72vh] items-center justify-center bg-gray-50/30 px-4">
        <div className="rounded-3xl border border-gray-100 bg-white p-8 text-center shadow-xl">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-primary/10 text-primary">
            <PackageCheck className="h-12 w-12 text-primary" />
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
            Your cart is empty
          </h2>
          <p className="mx-auto mt-3 max-w-sm text-gray-600">
            Add some products first, then come back to checkout.
          </p>
          <Link
            to="/products"
            className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-primary/30 transition hover:bg-primary/90"
          >
            <Sparkles className="h-4 w-4" />
            Explore products
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-[72vh] bg-gray-50/30">
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-in-up { animation: fade-in-up .6s ease-out both; }
        .delay-1 { animation-delay: .1s; }
        .delay-2 { animation-delay: .2s; }
        .card-hover { transition: transform .2s ease, box-shadow .15s ease; }
        .card-hover:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,.06); }
        .step-connector { flex: 1; height: 1px; background: linear-gradient(90deg, currentColor, transparent); opacity: .18; }
      `}</style>

      <div className="relative overflow-hidden bg-gradient-to-br from-[#183f31] to-[#25573c] py-16 text-white md:py-24">
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 text-center md:px-8">
          <Link
            to="/cart"
            className="group mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-[#FBBC05] transition hover:bg-white/15"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            Back to cart
          </Link>
          <div className="fade-in-up">
            <span className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-[#FBBC05]">
              Gurudeb Enterprise
            </span>
            <h1 className="mx-auto mb-6 max-w-4xl text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
              Complete Your <span className="text-[#FBBC05]">Checkout</span>
            </h1>
            <p className="mx-auto max-w-3xl text-lg font-medium leading-relaxed text-gray-200/90 md:text-xl">
              Confirm delivery details, choose payment, and place your order
              with confidence.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 py-16 md:px-8">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-6 lg:grid-cols-12"
        >
          {/* ── LEFT column ── */}
          <div className="space-y-5 lg:col-span-7">
            {/* delivery section */}
            <div className="card-hover overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm fade-in-up delay-1">
              {/* header stripe */}
              <div className="flex items-center justify-between gap-4 border-b border-gray-100 bg-gray-50/60 px-6 py-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-900">Delivery Info</h2>
                    <p className="text-xs text-gray-500">
                      Where should we ship?
                    </p>
                  </div>
                </div>
                {user ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-bold text-emerald-700">
                    <BadgeCheck className="h-3 w-3" /> Signed in
                  </span>
                ) : (
                  <Link
                    to="/signin"
                    className="inline-flex items-center gap-1 rounded-xl border border-primary/20 px-3 py-1.5 text-xs font-bold text-primary transition hover:bg-primary hover:text-white"
                  >
                    Sign in <ChevronRight className="h-3 w-3" />
                  </Link>
                )}
              </div>

              <div className="p-6">
                {/* saved addresses */}
                {addresses.length > 0 && (
                  <div className="mb-6">
                    <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-zinc-400">
                      Saved addresses
                    </p>
                    <div className="grid gap-2.5 md:grid-cols-2">
                      {addresses.map((addr) => (
                        <button
                          key={addr.id}
                          type="button"
                          onClick={() => applyAddress(addr)}
                          className={`group relative overflow-hidden rounded-2xl border p-4 text-left transition-all duration-200 ${
                            selectedAddressId === addr.id
                              ? "border-primary bg-primary/5 shadow-[0_0_0_4px_rgb(var(--color-primary-rgb)/0.1)]"
                              : "border-zinc-200 bg-white hover:border-primary/40 hover:bg-zinc-50"
                          }`}
                        >
                          {selectedAddressId === addr.id && (
                            <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-white">
                              ✓
                            </span>
                          )}
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-bold text-zinc-900">
                              {addr.label}
                            </p>
                            {addr.isDefault && (
                              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                                Default
                              </span>
                            )}
                          </div>
                          <p className="mt-1.5 text-xs font-medium text-zinc-600">
                            {addr.fullName} · {addr.phone}
                          </p>
                          <p className="mt-0.5 text-xs text-zinc-400">
                            {addr.addressLine}, {addr.city}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* form fields */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <FieldLabel>Recipient name</FieldLabel>
                    <Input
                      value={form.fullName}
                      onChange={(e) => updateForm("fullName", e.target.value)}
                      placeholder="Full name"
                    />
                  </div>
                  <div>
                    <FieldLabel>Phone number</FieldLabel>
                    <Input
                      value={form.phone}
                      onChange={(e) => updateForm("phone", e.target.value)}
                      inputMode="numeric"
                      placeholder="01XXXXXXXXX"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <FieldLabel>Email</FieldLabel>
                    <Input
                      value={form.email}
                      onChange={(e) => updateForm("email", e.target.value)}
                      type="email"
                      placeholder="name@example.com"
                    />
                  </div>
                  <div className="grid gap-4 md:col-span-2 md:grid-cols-3">
                    <div>
                      <FieldLabel>
                        Division <span className="text-primary">*</span>
                      </FieldLabel>
                      <Select
                        value={form.division}
                        onChange={(e) => updateForm("division", e.target.value)}
                      >
                        <option className="text-lg" value="">
                          Select Division
                        </option>
                        {Object.keys(districtsByDivision).map((division) => (
                          <option
                            className="text-lg"
                            key={division}
                            value={division}
                          >
                            {division}
                          </option>
                        ))}
                      </Select>
                    </div>
                    <div>
                      <FieldLabel>
                        District <span className="text-primary">*</span>
                      </FieldLabel>
                      <Select
                        value={form.district}
                        onChange={(e) => updateForm("district", e.target.value)}
                        disabled={!form.division}
                      >
                        <option className="text-lg" value="">
                          Select District
                        </option>
                        {(districtsByDivision[form.division] || []).map(
                          (district) => (
                            <option
                              className="text-lg"
                              key={district}
                              value={district}
                            >
                              {district}
                            </option>
                          ),
                        )}
                      </Select>
                    </div>
                    <div>
                      <FieldLabel>
                        Sub District <span className="text-primary">*</span>
                      </FieldLabel>
                      <Select
                        value={form.subDistrict}
                        onChange={(e) =>
                          updateForm("subDistrict", e.target.value)
                        }
                        disabled={!form.district}
                      >
                        <option className="text-lg" value="">
                          Select Sub District
                        </option>
                        {(subDistrictsByDistrict[form.district] || []).map(
                          (subDistrict) => (
                            <option
                              className="text-lg"
                              key={subDistrict}
                              value={subDistrict}
                            >
                              {subDistrict}
                            </option>
                          ),
                        )}
                      </Select>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <FieldLabel>Delivery address</FieldLabel>
                    <Textarea
                      value={form.addressLine}
                      onChange={(e) =>
                        updateForm("addressLine", e.target.value)
                      }
                      placeholder="House no., road, area, landmark…"
                      className="min-h-[100px]"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <FieldLabel>
                      Order note{" "}
                      <span className="normal-case font-normal text-zinc-300">
                        (optional)
                      </span>
                    </FieldLabel>
                    <Textarea
                      value={form.note}
                      onChange={(e) => updateForm("note", e.target.value)}
                      placeholder="Preferred delivery time, special instructions…"
                      className="min-h-[80px]"
                    />
                  </div>
                </div>

                {user && !selectedAddressId && (
                  <label className="mt-5 flex w-fit cursor-pointer items-center gap-2.5 text-sm font-semibold text-zinc-600 transition hover:text-primary">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={saveAddress}
                        onChange={(e) => setSaveAddress(e.target.checked)}
                        className="peer h-5 w-5 cursor-pointer appearance-none rounded-lg border-2 border-zinc-300 transition checked:border-primary checked:bg-primary"
                      />
                      <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-[10px] text-white opacity-0 peer-checked:opacity-100">
                        ✓
                      </span>
                    </div>
                    Save this address for future orders
                  </label>
                )}
              </div>
            </div>

            {/* payment section */}
            <div className="card-hover overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm fade-in-up delay-2">
              <div className="flex items-center gap-3 border-b border-gray-100 bg-gray-50/60 px-6 py-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <BadgeCheck className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-bold text-gray-900">
                    Select Payment Method
                  </h2>
                  <p className="text-xs text-gray-500">
                    Choose your preferred payment option.
                  </p>
                </div>
              </div>

              <div className="space-y-3 p-6">
                {[
                  {
                    id: "cod",
                    title: "Cash on Delivery",
                    logo: "/Img/checkoutPayment/cash.png",
                  },
                  {
                    id: "bkash",
                    title: "Bkash",
                    logo: "/Img/checkoutPayment/BKash_Logo.png",
                  },
                  {
                    id: "nagad",
                    title: "Nagad",
                    logo: "/Img/checkoutPayment/nagad.png",
                  },
                  {
                    id: "rocket",
                    title: "Rocket",
                    logo: "/Img/checkoutPayment/rocket.png.webp",
                  },
                ].map(({ id, title, logo }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setPaymentMethod(id)}
                    className={`flex w-full cursor-pointer items-center justify-between gap-4 rounded-2xl border p-4 text-left transition ${
                      paymentMethod === id
                        ? "border-primary bg-primary/5"
                        : "border-gray-100 bg-white hover:border-primary/40 hover:bg-gray-50"
                    }`}
                  >
                    <span className="flex min-w-0 items-center gap-2.5">
                      <span
                        className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border ${
                          paymentMethod === id
                            ? "border-primary ring-2 ring-primary ring-offset-2"
                            : "border-zinc-400"
                        }`}
                      >
                        {paymentMethod === id && (
                          <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                        )}
                      </span>
                      <span className="truncate text-base font-bold text-gray-900">
                        {title}
                      </span>
                    </span>
                    {logo && (
                      <img
                        src={logo}
                        alt={`${title} logo`}
                        className="h-7 w-9 shrink-0 object-contain"
                      />
                    )}
                    {paymentMethod === id && <span className="sr-only">✓</span>}
                  </button>
                ))}

                <div className="mt-6 border-t border-gray-100 pt-5">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-widest text-zinc-400">
                        Paid From <span className="text-primary">*</span>
                      </label>
                      <input
                        value={paymentDetails.paidFrom}
                        onChange={(e) =>
                          updatePaymentDetails("paidFrom", e.target.value)
                        }
                        placeholder="e.g., 01xxxxxxxxx"
                        className="h-12 w-full rounded-2xl border border-zinc-200 bg-zinc-50/60 px-4 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-primary/60 focus:bg-white focus:ring-2 focus:ring-primary/10"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-widest text-zinc-400">
                        Transaction ID <span className="text-primary">*</span>
                      </label>
                      <input
                        value={paymentDetails.transactionId}
                        onChange={(e) =>
                          updatePaymentDetails("transactionId", e.target.value)
                        }
                        placeholder="e.g., 8N7F6G5H"
                        className="h-12 w-full rounded-2xl border border-zinc-200 bg-zinc-50/60 px-4 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-primary/60 focus:bg-white focus:ring-2 focus:ring-primary/10"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-widest text-zinc-400">
                        Amount
                      </label>
                      <div className="flex h-12 overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50/60 focus-within:border-primary/60 focus-within:bg-white focus-within:ring-2 focus-within:ring-primary/10">
                        <span className="flex items-center px-3 text-sm font-medium text-zinc-900">
                          Tk
                        </span>
                        <input
                          value={paymentDetails.amount}
                          onChange={(e) =>
                            updatePaymentDetails("amount", e.target.value)
                          }
                          placeholder="120"
                          className="min-w-0 flex-1 border-0 bg-transparent px-1 text-sm text-zinc-950 outline-none placeholder:text-zinc-400"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT column / order summary ── */}
          <aside className="lg:col-span-5">
            <div className="card-hover overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm fade-in-up delay-1 lg:sticky lg:top-28">
              {/* header */}
              <div className="border-b border-gray-100 bg-gray-50/60 px-6 py-5">
                <h2 className="font-bold text-gray-900">Order Summary</h2>
                <p className="mt-0.5 text-xs text-gray-500">
                  {cartItems.length} item{cartItems.length !== 1 ? "s" : ""} in
                  your cart
                </p>
              </div>

              {/* items list */}
              <div className="max-h-[320px] space-y-3 overflow-y-auto px-6 py-5 scrollbar-thin">
                {cartItems.map((item) => {
                  const img =
                    item.img ||
                    item.image ||
                    (item.images && item.images[0]?.image) ||
                    "/Img/logo/logo.png";
                  const qty = item.quantity || 1;
                  const price = parsePrice(item.price);
                  const productPath = item.slug || item.id;
                  const SummaryItem = productPath ? Link : "div";

                  return (
                    <SummaryItem
                      key={item.id}
                      {...(productPath
                        ? { to: `/product/${productPath}` }
                        : {})}
                      className="flex gap-3.5 rounded-2xl border border-gray-100 bg-gray-50/70 p-3 transition hover:border-primary/40 hover:bg-primary/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                      title={productPath ? `View ${item.name}` : undefined}
                    >
                      <div className="relative h-16 w-14 shrink-0 overflow-hidden rounded-xl border border-zinc-200">
                        <img
                          src={img}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white shadow">
                          {qty}
                        </span>
                      </div>
                      <div className="flex flex-1 items-center justify-between gap-2 min-w-0">
                        <p className="line-clamp-2 text-xs font-semibold text-zinc-800">
                          {item.name}
                        </p>
                        <p className="shrink-0 text-sm font-black text-primary">
                          {formatWithSymbol(price * qty, currencySymbol)}
                        </p>
                      </div>
                    </SummaryItem>
                  );
                })}
              </div>

              {/* totals */}
              <div className="space-y-3 border-t border-zinc-100 px-6 py-5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-500">Subtotal</span>
                  <span className="font-bold text-zinc-800">
                    {formatWithSymbol(subtotal, currencySymbol)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-500">Delivery charge</span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700">
                    <Truck className="h-3 w-3" /> Free
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-500">Discount</span>
                  <span className="font-bold text-zinc-800">
                    {formatWithSymbol(discount, currencySymbol)}
                  </span>
                </div>
                <div className="flex gap-2 border-b border-zinc-200 pb-4">
                  <input
                    value={voucherCode}
                    onChange={(e) => setVoucherCode(e.target.value)}
                    placeholder="Have a voucher code?"
                    className="h-11 min-w-0 flex-1 rounded-lg border border-primary bg-white px-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-500 focus:ring-2 focus:ring-primary/20"
                  />
                  <button
                    type="button"
                    className="h-11 shrink-0 cursor-pointer rounded-lg bg-primary px-5 text-sm font-bold text-white transition hover:bg-primary/90 active:scale-[0.98]"
                  >
                    Apply
                  </button>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-primary/5 px-4 py-3.5">
                  <span className="font-bold text-primary">Total</span>
                  <span className="text-2xl font-black tracking-tight text-primary">
                    {formatWithSymbol(total, currencySymbol)}
                  </span>
                </div>
              </div>

              {/* CTA */}
              <div className="px-6 pb-6">
                <button
                  type="submit"
                  className="group relative w-full cursor-pointer overflow-hidden rounded-2xl bg-primary px-6 py-4 text-sm font-black text-white shadow-xl shadow-primary/30 transition-all duration-300 hover:shadow-primary/50 active:scale-[0.98]"
                >
                  <span className="absolute inset-0 -translate-x-full skew-x-[-15deg] bg-white/10 transition-transform duration-500 group-hover:translate-x-full" />
                  <span className="relative flex items-center justify-center gap-2">
                    <PackageCheck className="h-5 w-5" />
                    Place Order
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </button>

                <p className="mt-4 text-center text-[11px] leading-relaxed text-zinc-400">
                  By placing this order you agree to our{" "}
                  <span className="font-semibold text-primary underline underline-offset-2 cursor-pointer">
                    terms & delivery policy
                  </span>
                  .
                </p>
              </div>
            </div>
          </aside>
        </form>
      </div>
    </section>
  );
};

export default Checkout;
