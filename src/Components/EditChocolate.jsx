import { Link, useLoaderData } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";
import Swal from "sweetalert2";

const EditChocolate = () => {
    
    const editChocolate = useLoaderData();
    console.log(editChocolate);

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

        fetch(`https://practice-server-mahmud3301.vercel.app/chocolates/${editChocolate._id}`, {
            method: "PUT",
            body: JSON.stringify(newChocolate),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    Swal.fire(
                        'Success',
                        'Updated!',
                        'success'
                    )
                }
            })
            .catch(error => {
                console.error(error);
            });
    }


    return (
        <div className="p-8">
            <section className="flex items-start">
                <Link to="/">
                    <HiArrowLeft className="mt-2 mr-3" />
                </Link>
                <h1 className="text-3xl text-center font-semibold">Update Chocolate</h1>
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
                        <h1 className="text-3xl font-bold">Update Chocolates</h1>
                        <br />
                        <p>Use the below form to update a product</p>
                    </div>
                    <br />
                    <br />
                    <div>
                        <input
                            required
                            type="text"
                            name="Name"
                            placeholder="Name"
                            defaultValue={editChocolate.name}
                            className="input input-bordered border-[#91572B] w-full"
                        />
                        <br />
                        <br />
                        <input
                            required
                            type="text"
                            name="Country"
                            placeholder="Country"
                            defaultValue={editChocolate.country}
                            className="input input-bordered border-[#91572B] w-full"
                        />
                        <br />
                        <br />
                        <input
                            required
                            type="url"
                            name="Image"
                            placeholder="Image Url"
                            defaultValue={editChocolate.Image}
                            className="input input-bordered border-[#91572B] w-full"
                        />
                        <br />
                        <br />
                        <select name="Category" className="select border-[#91572B] w-full  select-bordered " required defaultValue={editChocolate.category}>
                            <option disabled selected value=''>Select Category</option>
                            <option>Premium</option>
                            <option>Normal</option>
                        </select>
                        <br />
                        <input
                            type="submit"
                            value="Update"
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

export default EditChocolate;