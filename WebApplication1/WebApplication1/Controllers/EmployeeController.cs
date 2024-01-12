using System;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
	public class EmployeeController : ApiController
	{
		[HttpGet]
		public HttpResponseMessage Get()
		{
			try
			{
				string query = "SELECT * FROM dbo.Employee AS e JOIN dbo.Department AS d ON e.Department = d.DepartmentId";
				DataTable table = new DataTable();

				using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeDB"].ConnectionString))
				using (var cmd = new SqlCommand(query, con))
				using (var da = new SqlDataAdapter(cmd))
				{
					cmd.CommandType = CommandType.Text;
					da.Fill(table);
				}

				return Request.CreateResponse(HttpStatusCode.OK, table);
			}
			catch (Exception ex)
			{
				return Request.CreateResponse(HttpStatusCode.InternalServerError, $"Error: {ex.Message}");
			}
		}

		[HttpPost]
		public HttpResponseMessage Post(Employee emp)
		{
			try
			{
				string query = @"
                    INSERT INTO dbo.Employee 
                    (
                        FirstName,
                        LastName,
                        Email,
                        DateOfBirth,
                        Age,
                        Salary,
                        Department
                    )
                    VALUES
                    (
                        @FirstName,
                        @LastName,
                        @Email,
                        @DateOfBirth,
                        @Age,
                        @Salary,
                        @Department
                    )
                ";

				using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeDB"].ConnectionString))
				using (var cmd = new SqlCommand(query, con))
				{
					con.Open();
					cmd.CommandType = CommandType.Text;

					// Set parameters with values from the Employee object
					cmd.Parameters.AddWithValue("@FirstName", emp.FirstName);
					cmd.Parameters.AddWithValue("@LastName", emp.LastName);
					cmd.Parameters.AddWithValue("@Email", emp.Email);
					cmd.Parameters.AddWithValue("@DateOfBirth", emp.DateOfBirth);
					cmd.Parameters.AddWithValue("@Age", emp.Age);
					cmd.Parameters.AddWithValue("@Salary", emp.Salary);
					cmd.Parameters.AddWithValue("@Department", emp.Department);

					int rowsAffected = cmd.ExecuteNonQuery();

					if (rowsAffected > 0)
					{
						return Request.CreateResponse(HttpStatusCode.OK, "Added Successfully!!");
					}
					else
					{
						return Request.CreateResponse(HttpStatusCode.BadRequest, "No records were added.");
					}
				}
			}
			catch (Exception ex)
			{
				return Request.CreateResponse(HttpStatusCode.InternalServerError, $"Failed to Add: {ex.Message}");
			}
		}

		// Add your other methods (Put, Delete, GetAllDepartmentNames) here...
		public string Put(Employee emp)
		{
			try
			{
				string query = @"
            UPDATE dbo.Employee
            SET
                FirstName = @FirstName,
                LastName = @LastName,
                Email = @Email,
                DateOfBirth = @DateOfBirth,
                Age = @Age,
                Salary = @Salary,
                Department = @Department
            WHERE EmployeeId = @EmployeeId
        ";

				using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeDB"].ConnectionString))
				using (var cmd = new SqlCommand(query, con))
				{
					con.Open();
					cmd.CommandType = CommandType.Text;

					// Set parameters with values from the Employee object
					cmd.Parameters.AddWithValue("@FirstName", emp.FirstName);
					cmd.Parameters.AddWithValue("@LastName", emp.LastName);
					cmd.Parameters.AddWithValue("@Email", emp.Email);
					cmd.Parameters.AddWithValue("@DateOfBirth", emp.DateOfBirth);
					cmd.Parameters.AddWithValue("@Age", emp.Age);
					cmd.Parameters.AddWithValue("@Salary", emp.Salary);
					cmd.Parameters.AddWithValue("@Department", emp.Department);
					cmd.Parameters.AddWithValue("@EmployeeId", emp.EmployeeId);

					int rowsAffected = cmd.ExecuteNonQuery();

					if (rowsAffected > 0)
					{
						return "Updated Successfully!!";
					}
					else
					{
						return "No records were updated.";
					}
				}
			}
			catch (Exception)
			{
				return "Failed to Update!!";
			}
		}


		[HttpDelete]
		public HttpResponseMessage Delete(int id)
		{
			try
			{
				string query = @"
            DELETE FROM dbo.Employee 
            WHERE EmployeeId = @EmployeeId
        ";

				using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeDB"].ConnectionString))
				using (var cmd = new SqlCommand(query, con))
				{
					con.Open();

					cmd.Parameters.AddWithValue("@EmployeeId", id);

					int rowsAffected = cmd.ExecuteNonQuery();

					if (rowsAffected > 0)
					{
						return Request.CreateResponse(HttpStatusCode.OK, "Deleted Successfully!!");
					}
					else
					{
						return Request.CreateResponse(HttpStatusCode.NotFound, "No employee found with the specified EmployeeId.");
					}
				}
			}
			catch (Exception ex)
			{
				return Request.CreateResponse(HttpStatusCode.InternalServerError, "Failed to Delete: " + ex.Message);
			}
		}


		[Route("api/Employee/GetAllDepartmentNames")]
		[HttpGet]
		public HttpResponseMessage GetAllDepartmentNames()
		{
			string query = @"
                    select DepartmentName from dbo.Department";

			DataTable table = new DataTable();
			using (var con = new SqlConnection(ConfigurationManager.
				ConnectionStrings["EmployeeDB"].ConnectionString))
			using (var cmd = new SqlCommand(query, con))
			using (var da = new SqlDataAdapter(cmd))
			{
				cmd.CommandType = CommandType.Text;
				da.Fill(table);
			}

			return Request.CreateResponse(HttpStatusCode.OK, table);
		}

	}
}

