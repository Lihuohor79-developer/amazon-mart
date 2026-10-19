import { useState } from "react";
import {
  Upload,
  X,
  Tag,
  Weight,
  Package,
  Building,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  Loader2,
  BadgeIndianRupee,
} from "lucide-react";
import { createHookah, uploadImage } from "../../api/adminApi";
import { addHookahPageStyles as s } from "../../assets/dummyStyles";

const InputFeild = ({
  icon: Icon,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  prefix,
  ...props
}) => (
  <div className={s.inputFieldWrapper}>
    <label className={s.inputFieldLabel}>
      {Icon && <Icon className={s.inputFieldIcon} />}
      {label}
    </label>
    <div className={s.inputFieldInner}>
      {prefix && <span className={s.inputFieldPrefix}>{prefix}</span>}

      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete="off"
        className={`${s.inputFieldInput} ${prefix ? s.inputFieldInputWithPrefix : ""}`}
        {...props}
      />
    </div>
  </div>
);

const AddHookahPage = () => {
  const [form, setForm] = useState({
    name: "",
    company: "",
    selling: "",
    original: "",
    weight: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setPreview(null);
  };

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "success" });
      if (type === "success") window.location.reload();
    }, 1500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, company, selling, original, weight } = form;
    if (!name || !company || !selling || !original || !weight || !image) {
      return showToast("Please fill all fields and upload an image.", "error");
    }

    try {
      setIsSubmitting(true);
      const imageData = await uploadImage(image);

      await createHookah({
        image: {
          url: imageData.image.url,
          public_id: imageData.image.public_id,
        },
        name,
        company,
        sellingPrice: Number(selling),
        oldPrice: Number(original),
        size: weight,
      });
      showToast("Hookah added Successfully");

      setForm({
        name: "",
        company: "",
        selling: "",
        original: "",
        weight: "",
      });
      setImage(null);
      setPreview(null);
    } catch (error) {
      console.log(error);
      showToast("Failed to add hookah.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={s.mainContainer}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
        
        /* Override browser autofill background */
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
          -webkit-box-shadow: 0 0 0 1000px #000 inset !important;
          -webkit-text-fill-color: #fff !important;
          background-color: #000 !important;
          background: #000 !important;
        }
        input:-moz-autofill {
          background-color: #000 !important;
          color: #fff !important;
        }
        
        .card-glow {
          box-shadow: 0 25px 50px -12px rgba(255, 215, 0, 0.12), inset 0 1px 2px rgba(255, 255, 255, 0.03);
        }
        .toast-animate {
          animation: slideDown 0.3s ease-out forwards;
        }
        @keyframes slideDown {
          0% { opacity: 0; transform: translateY(-20px) scale(0.95); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .btn-glow {
          background: linear-gradient(135deg, #fbbf24, #f59e0b);
          box-shadow: 0 8px 24px -6px rgba(251, 191, 36, 0.4);
        }
        .btn-glow:hover {
          box-shadow: 0 12px 32px -6px rgba(251, 191, 36, 0.6);
          transform: translateY(-2px) scale(1.02);
        }
        .upload-area {
          background: radial-gradient(circle at 30% 30%, rgba(255, 215, 0, 0.03), transparent 70%);
        }
      `}</style>

      {/* Toast */}
      {toast.show && (
        <div
          className={`${s.toastBase} ${toast.type === "success" ? s.toastSuccess : s.toastError} toast-animate`}
        >
          {toast.type === "success" ? (
            <CheckCircle className={s.toastIconSuccess} />
          ) : (
            <AlertCircle className={s.toastIconError} />
          )}

          <span className={s.toastMessage}>{toast.message}</span>
        </div>
      )}

      {/* Main Card */}

      <div className={s.card}>
        <div className={s.decoGlow1} />
        <div className={s.decoGlow2} />

        {/* Header */}
        <div className={s.header}>
          <h1 className={s.heading}>
            <span className={s.headingHighlight}>Add</span> Hookah
          </h1>
          <div className={s.headerBadge}>
            <Package className={s.headerBadgeIcon} />
            <span className={s.headerBadgeText}>New Arrival</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className={s.form}>
          {/* Image Upload */}
          <div>
            <label className={s.uploadLabel}>Hookah Image</label>
            <div
              className={`${s.uploadAreaBase} ${preview ? s.uploadAreaWithPreview : s.uploadAreaEmpty}`}
            >
              {preview ? (
                <div className={s.uploadPreviewContainer}>
                  <img src={preview} className={s.uploadPreviewImage} />
                  <button
                    type="button"
                    onClick={removeImage}
                    className={s.removeImageButton}
                  >
                    <X className={s.iconSm} />{" "}
                  </button>
                </div>
              ) : (
                <label className={s.uploadLabelInner}>
                  <div className={s.uploadIconWrapper}>
                    <Upload className={s.uploadIcon} />
                  </div>
                  <p className={s.uploadText}>
                    <span className={s.uploadTextHighlight}>
                      Click to upload
                    </span>{" "}
                    or drag or drop
                  </p>
                  <p className={s.uploadSubtext}>PNG, JPG, WEBP (max SMB)</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImage}
                    className={s.hiddenInput}
                  />
                </label>
              )}
            </div>
          </div>

          {/* Fields Grid */}
          <div className={s.fieldsGrid}>
            <InputFeild
              icon={Tag}
              label="Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Pharaoh's Crown"
            />
            <InputFeild
              icon={Weight}
              label="Weight / Size"
              name="weight"
              value={form.weight}
              onChange={handleChange}
              placeholder="e.g. 1 set (15 mm)"
            />
            <InputFeild
              icon={BadgeIndianRupee}
              label="Selling Price"
              type="number"
              name="selling"
              value={form.selling}
              onChange={handleChange}
              placeholder="49.99"
              prefix="₹"
            />
            <InputFeild
              icon={BadgeIndianRupee}
              label="Original Price"
              type="number"
              name="original"
              value={form.original}
              onChange={handleChange}
              placeholder="69.99"
              prefix="₹"
            />
          </div>

          {/* Company Name */}
          <div>
            <label className={s.companyLabel}>
              <Building className={s.companyIcon} /> Company Name
            </label>
            <input
              type="text"
              name="company"
              value={form.company}
              onChange={handleChange}
              autoComplete="off"
              placeholder="e.g. Hookah Masters LLC"
              className={s.companyInput}
            />
          </div>

          {/* Submit Button */}
          <div className={s.submitWrapper}>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`${s.submitButton} btn-glow`}
            >
              {isSubmitting ? (
                <Loader2 className={s.submitIcon} />
              ) : (
                <ArrowRight className={s.submitIcon} />
              )}
              <span>{isSubmitting ? "Adding..." : "Add Hookah"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddHookahPage;
