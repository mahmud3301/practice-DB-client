import { HiArrowLeft } from "react-icons/hi";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const AddChocolate = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.Name.value;
        const country = form.Country.value;
        const category = form.Category.value;
        const Image = form.Image.value;
        form.reset();

        const newChocolate = {
            name,
            country,
            category,
            Image
        }
        // console.log(newChocolate);

        fetch("https://practice-server-mahmud3301.vercel.app/chocolates", {
            method: "POST",
            headers: {
                "content-Type": "application/json",
            },
            body: JSON.stringify(newChocolate),
        })
        .then(response => response.json()).then(data => {
            console.log(data);
            if (data.insertedId){
                Swal.fire(
                    'success',
                    'Added!',
                    'success'
                )
            }
        })

    };

    return (
        <div className="p-8">
            <section className="flex items-start">
                <Link to="/">
                    <HiArrowLeft className="mt-2 mr-3" />
                </Link>
                <h1 className="text-3xl text-center font-semibold">Add Chocolate</h1>
            </section>
            <br />
            <br />
            <hr className="w-full border-[#91572B]" />
            <br />
            <br />
            <br />
            <br />
            <form onSubmit={handleSubmit}>
                <section className="p-8 bg-[#1414140D] rounded-2xl">
                    <div className="text-center mt-3">
                        <h1 className="text-3xl font-bold">New Chocolates</h1>
                        <br />
                        <p>Use the below form to create a new product</p>
                    </div>
                    <br />
                    <br />
                    <div>
                        <input
                            required
                            type="text"
                            name="Name"
                            placeholder="Name"
                            className="input input-bordered border-[#91572B] w-full"
                        />
                        <br />
                        <br />
                        <input
                            required
                            type="text"
                            name="Country"
                            placeholder="Country"
                            className="input input-bordered border-[#91572B] w-full"
                        />
                        <br />
                        <br />
                        <input
                            required
                            type="url"
                            name="Image"
                            placeholder="Image Url"
                            className="input input-bordered border-[#91572B] w-full"
                        />
                        <br />
                        <br />
                        <select name="Category" className="select border-[#91572B] w-full  select-bordered " required>
                            <option disabled selected value=''>Select Category</option>
                            <option>Premium</option>
                            <option>Normal</option>
                        </select>
                        <br />
                        <input
                            type="submit"
                            value="Add"
                            className="w-full p-4 bg-[#91572B] text-white mt-7 rounded-xl"
                        />
                    </div>
                </section>
            </form>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
        </div>
    );
};

export default AddChocolate;