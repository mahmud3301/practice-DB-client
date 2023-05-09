import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { FiEdit2 } from "react-icons/fi";
import Swal from "sweetalert2";
import chocolateIcon from "./assets/Choc_bar_44350.ico";

const App = () => {
  const chocolatesData = useLoaderData();
  const [chocolates, setChocolate] = useState(chocolatesData);

  const handleDelete = (_id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger mr-5'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://practice-server-mahmud3301.vercel.app/chocolates/${_id}`, {
          method: "DELETE"
        })
          .then(response => response.json())
          .then(data => {
            if (data.deletedCount > 0) {
              swalWithBootstrapButtons.fire(
                'Deleted!',
                'Your item has been deleted.',
                'success'
              );
              const remaining = chocolates.filter(chocolate => chocolate._id !== _id);
              setChocolate(remaining);
            } else {
              swalWithBootstrapButtons.fire(
                'Failed to delete',
                'An error occurred while deleting the item.',
                'error'
              );
            }
          })
          .catch(error => {
            swalWithBootstrapButtons.fire(
              'Failed to delete',
              'An error occurred while deleting the item.',
              'error'
            );
            console.log(error);
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your item is safe :)',
          'error'
        );
      }
    });
  };


  return (
    <div className="p-8 mt-8">
      <Link to="/AddChocolate">
        <section className="flex items-start border-2 shadow-2xl p-2 w-44 border-[#e19b65]">
          <AiOutlinePlus />
          <h1>Add Chocolate</h1>
          <img src={chocolateIcon} alt="" className="w-[16.82px] h-[24px] ml-3" />
        </section>
      </Link>
      <br /><br /><br />

      <section>
        <div className="overflow-x-auto w-full">
          {chocolates && chocolates.length > 0 ? (
            <table className="table w-full">
              <thead>
                <tr>
                  <th></th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Country</th>
                  <th>Category</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {chocolates.map((chocolate) => (
                  <tr key={chocolate._id}>
                    <th> 
                    </th>
                    <td>
                      <div className="flex items-center space-x-3">
                        {chocolate.Image ? (
                          <div className="avatar">
                            <div className="mask w-12 h-12">
                              <img src={chocolate.Image} alt="" />
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </td>
                    <td>
                      <div>
                        <div className="font-bold">{chocolate.name}</div>
                      </div>
                    </td>
                    <td>{chocolate.country}</td>
                    <td>{chocolate.category}</td>
                    <td>
                      <div className="flex items-center space-x-5">
                        <Link to={`/EditChocolate/${chocolate._id}`}>
                          <div className="p-3 bg-[#c26f46] text-[#fbac6f] rounded-lg">
                            <FiEdit2 />
                          </div>
                        </Link>
                        <div onClick={() => handleDelete(chocolate._id)} className="p-3 bg-[#c26f46] text-[#fbac6f] rounded-lg">
                          <RxCross2 />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No chocolates available.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default App;