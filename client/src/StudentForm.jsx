import { useState } from "react";

export default function StudentForm({ onResult }) {
  const [formData, setFormData] = useState({
    school: "",
    sex: "",
    age: "",
    famsize: "",
    Pstatus: "",
    Medu: "",
    Fedu: "",
    Mjob: "",
    Fjob: "",
    studytime: "",
    failures: "",
    schoolsup: "",
    famsup: "",
    paid: "",
    activities: "",
    nursery: "",
    higher: "",
    famrel: "",
    G1: "",
    G2: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const validate = () => {
    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (value === "" || value === null)
        newErrors[key] = "This field is required";
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = { Inputs: { data: [formData] }, GlobalParameters: {} };

    try {
      const res = await fetch("http://localhost:3000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      const pred = data.Results[0];

      let hrGrade;
      if (pred <= 9) hrGrade = 1;
      else if (pred <= 12) hrGrade = 2;
      else if (pred <= 15) hrGrade = 3;
      else if (pred <= 18) hrGrade = 4;
      else hrGrade = 5;

      onResult({ decimal: pred.toFixed(2), hr: hrGrade });
    } catch (err) {
      console.error(err);
      onResult({ error: "Something went wrong..." });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg space-y-6"
    >
      <h2 className="text-3xl font-bold text-center">
        Student Final Grade Prediction
      </h2>
      <p className="text-gray-600 text-sm text-center mb-4">
        This form uses data from Portuguese schools (GP = Gabriel Pereira, MS =
        Mousinho da Silveira). All fields are required.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* School */}
        <label className="flex flex-col">
          School
          <span className="text-gray-500 text-xs">
            GP = Gabriel Pereira, MS = Mousinho da Silveira
          </span>
          <select
            name="school"
            value={formData.school}
            onChange={handleChange}
            className={`border rounded p-2 ${errors.school && "border-red-500"}`}
          >
            <option value="">-- select --</option>
            <option value="GP">GP</option>
            <option value="MS">MS</option>
          </select>
          {errors.school && (
            <span className="text-red-500 text-xs">{errors.school}</span>
          )}
        </label>

        {/* Sex */}
        <label className="flex flex-col">
          Sex
          <span className="text-gray-500 text-xs">F = Female, M = Male</span>
          <select
            name="sex"
            value={formData.sex}
            onChange={handleChange}
            className={`border rounded p-2 ${errors.sex && "border-red-500"}`}
          >
            <option value="">-- select --</option>
            <option value="F">F</option>
            <option value="M">M</option>
          </select>
          {errors.sex && (
            <span className="text-red-500 text-xs">{errors.sex}</span>
          )}
        </label>

        {/* Age */}
        <label className="flex flex-col">
          Age
          <span className="text-gray-500 text-xs">Student's age (15–22)</span>
          <input
            type="number"
            name="age"
            min="15"
            max="22"
            value={formData.age}
            onChange={handleChange}
            className={`border rounded p-2 ${errors.age && "border-red-500"}`}
          />
          {errors.age && (
            <span className="text-red-500 text-xs">{errors.age}</span>
          )}
        </label>

        {/* Family Size */}
        <label className="flex flex-col">
          Family Size
          <span className="text-gray-500 text-xs">
            LE3 = ≤3 members, GT3 = &gt;3 members
          </span>
          <select
            name="famsize"
            value={formData.famsize}
            onChange={handleChange}
            className={`border rounded p-2 ${errors.famsize && "border-red-500"}`}
          >
            <option value="">-- select --</option>
            <option value="LE3">LE3 (&le;3 members)</option>
            <option value="GT3">GT3 (&gt;3 members)</option>
          </select>
          {errors.famsize && (
            <span className="text-red-500 text-xs">{errors.famsize}</span>
          )}
        </label>

        {/* Pstatus */}
        <label className="flex flex-col">
          Parent Cohabitation Status
          <span className="text-gray-500 text-xs">
            T = living together, A = apart
          </span>
          <select
            name="Pstatus"
            value={formData.Pstatus}
            onChange={handleChange}
            className={`border rounded p-2 ${errors.Pstatus && "border-red-500"}`}
          >
            <option value="">-- select --</option>
            <option value="T">T</option>
            <option value="A">A</option>
          </select>
          {errors.Pstatus && (
            <span className="text-red-500 text-xs">{errors.Pstatus}</span>
          )}
        </label>

        {/* Mother Education */}
        <label className="flex flex-col">
          Mother's Education
          <span className="text-gray-500 text-xs">
            0=none, 1=primary, 2=5th-9th grade, 3=secondary, 4=higher
          </span>
          <input
            type="number"
            name="Medu"
            min="0"
            max="4"
            value={formData.Medu}
            onChange={handleChange}
            className={`border rounded p-2 ${errors.Medu && "border-red-500"}`}
          />
          {errors.Medu && (
            <span className="text-red-500 text-xs">{errors.Medu}</span>
          )}
        </label>

        {/* Father Education */}
        <label className="flex flex-col">
          Father's Education
          <span className="text-gray-500 text-xs">
            0=none, 1=primary, 2=5th-9th grade, 3=secondary, 4=higher
          </span>
          <input
            type="number"
            name="Fedu"
            min="0"
            max="4"
            value={formData.Fedu}
            onChange={handleChange}
            className={`border rounded p-2 ${errors.Fedu && "border-red-500"}`}
          />
          {errors.Fedu && (
            <span className="text-red-500 text-xs">{errors.Fedu}</span>
          )}
        </label>

        {/* Mjob */}
        <label className="flex flex-col">
          Mother's Job
          <span className="text-gray-500 text-xs">
            teacher, health, services, at_home, other
          </span>
          <select
            name="Mjob"
            value={formData.Mjob}
            onChange={handleChange}
            className={`border rounded p-2 ${errors.Mjob && "border-red-500"}`}
          >
            <option value="">-- select --</option>
            <option value="teacher">Teacher</option>
            <option value="health">Health</option>
            <option value="services">Services</option>
            <option value="at_home">At Home</option>
            <option value="other">Other</option>
          </select>
          {errors.Mjob && (
            <span className="text-red-500 text-xs">{errors.Mjob}</span>
          )}
        </label>

        {/* Fjob */}
        <label className="flex flex-col">
          Father's Job
          <span className="text-gray-500 text-xs">
            teacher, health, services, at_home, other
          </span>
          <select
            name="Fjob"
            value={formData.Fjob}
            onChange={handleChange}
            className={`border rounded p-2 ${errors.Fjob && "border-red-500"}`}
          >
            <option value="">-- select --</option>
            <option value="teacher">Teacher</option>
            <option value="health">Health</option>
            <option value="services">Services</option>
            <option value="at_home">At Home</option>
            <option value="other">Other</option>
          </select>
          {errors.Fjob && (
            <span className="text-red-500 text-xs">{errors.Fjob}</span>
          )}
        </label>

        {/* Studytime */}
        <label className="flex flex-col">
          Weekly Study Time
          <span className="text-gray-500 text-xs">
            1=&lt;2h, 2=2-5h, 3=5-10h, 4=&gt;10h
          </span>
          <input
            type="number"
            name="studytime"
            min="1"
            max="4"
            value={formData.studytime}
            onChange={handleChange}
            className={`border rounded p-2 ${errors.studytime && "border-red-500"}`}
          />
          {errors.studytime && (
            <span className="text-red-500 text-xs">{errors.studytime}</span>
          )}
        </label>

        {/* Failures */}
        <label className="flex flex-col">
          Past Failures
          <span className="text-gray-500 text-xs">0-3 (if &gt;=3, use 4)</span>
          <input
            type="number"
            name="failures"
            min="0"
            max="4"
            value={formData.failures}
            onChange={handleChange}
            className={`border rounded p-2 ${errors.failures && "border-red-500"}`}
          />
          {errors.failures && (
            <span className="text-red-500 text-xs">{errors.failures}</span>
          )}
        </label>

        {/* Schoolsup */}
        <label className="flex flex-col">
          Extra Educational Support
          <span className="text-gray-500 text-xs">yes/no</span>
          <select
            name="schoolsup"
            value={formData.schoolsup}
            onChange={handleChange}
            className={`border rounded p-2 ${errors.schoolsup && "border-red-500"}`}
          >
            <option value="">-- select --</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
          {errors.schoolsup && (
            <span className="text-red-500 text-xs">{errors.schoolsup}</span>
          )}
        </label>

        {/* Famsup */}
        <label className="flex flex-col">
          Family Support
          <span className="text-gray-500 text-xs">yes/no</span>
          <select
            name="famsup"
            value={formData.famsup}
            onChange={handleChange}
            className={`border rounded p-2 ${errors.famsup && "border-red-500"}`}
          >
            <option value="">-- select --</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
          {errors.famsup && (
            <span className="text-red-500 text-xs">{errors.famsup}</span>
          )}
        </label>

        {/* Paid */}
        <label className="flex flex-col">
          Extra Paid Classes
          <span className="text-gray-500 text-xs">yes/no</span>
          <select
            name="paid"
            value={formData.paid}
            onChange={handleChange}
            className={`border rounded p-2 ${errors.paid && "border-red-500"}`}
          >
            <option value="">-- select --</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
          {errors.paid && (
            <span className="text-red-500 text-xs">{errors.paid}</span>
          )}
        </label>

        {/* Activities */}
        <label className="flex flex-col">
          Extra-curricular Activities
          <span className="text-gray-500 text-xs">yes/no</span>
          <select
            name="activities"
            value={formData.activities}
            onChange={handleChange}
            className={`border rounded p-2 ${errors.activities && "border-red-500"}`}
          >
            <option value="">-- select --</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
          {errors.activities && (
            <span className="text-red-500 text-xs">{errors.activities}</span>
          )}
        </label>

        {/* Nursery */}
        <label className="flex flex-col">
          Attended Nursery
          <span className="text-gray-500 text-xs">yes/no</span>
          <select
            name="nursery"
            value={formData.nursery}
            onChange={handleChange}
            className={`border rounded p-2 ${errors.nursery && "border-red-500"}`}
          >
            <option value="">-- select --</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
          {errors.nursery && (
            <span className="text-red-500 text-xs">{errors.nursery}</span>
          )}
        </label>

        {/* Higher */}
        <label className="flex flex-col">
          Wants Higher Education
          <span className="text-gray-500 text-xs">yes/no</span>
          <select
            name="higher"
            value={formData.higher}
            onChange={handleChange}
            className={`border rounded p-2 ${errors.higher && "border-red-500"}`}
          >
            <option value="">-- select --</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
          {errors.higher && (
            <span className="text-red-500 text-xs">{errors.higher}</span>
          )}
        </label>

        {/* Famrel */}
        <label className="flex flex-col">
          Family Relationship Quality
          <span className="text-gray-500 text-xs">
            1=very bad ... 5=excellent
          </span>
          <input
            type="number"
            name="famrel"
            min="1"
            max="5"
            value={formData.famrel}
            onChange={handleChange}
            className={`border rounded p-2 ${errors.famrel && "border-red-500"}`}
          />
          {errors.famrel && (
            <span className="text-red-500 text-xs">{errors.famrel}</span>
          )}
        </label>

        {/* G1 */}
        <label className="flex flex-col">
          First Period Grade (G1)
          <span className="text-gray-500 text-xs">0-20</span>
          <input
            type="number"
            name="G1"
            min="0"
            max="20"
            value={formData.G1}
            onChange={handleChange}
            className={`border rounded p-2 ${errors.G1 && "border-red-500"}`}
          />
          {errors.G1 && (
            <span className="text-red-500 text-xs">{errors.G1}</span>
          )}
        </label>

        {/* G2 */}
        <label className="flex flex-col">
          Second Period Grade (G2)
          <span className="text-gray-500 text-xs">0-20</span>
          <input
            type="number"
            name="G2"
            min="0"
            max="20"
            value={formData.G2}
            onChange={handleChange}
            className={`border rounded p-2 ${errors.G2 && "border-red-500"}`}
          />
          {errors.G2 && (
            <span className="text-red-500 text-xs">{errors.G2}</span>
          )}
        </label>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition w-full md:w-auto"
      >
        Predict Final Grade
      </button>
    </form>
  );
}
