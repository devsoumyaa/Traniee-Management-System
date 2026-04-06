"# Traniee-Management-System"
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Trainee Information System</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <style>
        :root {
            --primary-color: #4361ee;
            --secondary-color: #3f37c9;
            --accent-color: #4895ef;
            --danger-color: #ef233c;
            --success-color: #2ec4b6;
            --background-color: #f8f9fa;
            --text-color: #2b2d42;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Poppins', sans-serif;
            background-color: var(--background-color);
            color: var(--text-color);
            line-height: 1.6;
        }

        .container {
            max-width: 1200px;
            margin: 2rem auto;
            padding: 0 20px;
        }

        h1 {
            text-align: center;
            color: var(--primary-color);
            margin-bottom: 2rem;
            font-size: 2.5rem;
            text-transform: uppercase;
            letter-spacing: 2px;
        }

        .form-container {
            background: white;
            padding: 2rem;
            border-radius: 10px;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
            margin-bottom: 2rem;
        }

        .form-group {
            margin-bottom: 1.5rem;
        }

        .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 500;
            color: var(--text-color);
        }

        .form-group input {
            width: 100%;
            padding: 0.8rem;
            border: 2px solid #e0e0e0;
            border-radius: 5px;
            transition: all 0.3s ease;
        }

        .form-group input:focus {
            border-color: var(--accent-color);
            outline: none;
            box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.1);
        }

        button {
            padding: 0.8rem 1.5rem;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-weight: 500;
            transition: all 0.3s ease;
        }

        button[type="submit"] {
            background-color: var(--primary-color);
            color: white;
            width: 100%;
            font-size: 1rem;
        }

        button[type="submit"]:hover {
            background-color: var(--secondary-color);
            transform: translateY(-2px);
        }

        .table-container {
            background: white;
            padding: 2rem;
            border-radius: 10px;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
            overflow-x: auto;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 1rem;
        }

        th {
            background-color: var(--primary-color);
            color: white;
            padding: 1rem;
            text-align: left;
        }

        td {
            padding: 1rem;
            border-bottom: 1px solid #e0e0e0;
        }

        tr:hover {
            background-color: #f8f9fa;
        }

        .edit-btn, .delete-btn {
            padding: 0.5rem 1rem;
            margin: 0 0.2rem;
            border-radius: 5px;
        }

        .edit-btn {
            background-color: var(--accent-color);
            color: white;
        }

        .delete-btn {
            background-color: var(--danger-color);
            color: white;
        }

        .edit-btn:hover, .delete-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        }

        
        @keyframes slideIn {
            from {
                transform: translateY(20px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }

        tr {
            animation: slideIn 0.3s ease-out forwards;
        }

        
        @media (max-width: 768px) {
            .container {
                padding: 0 10px;
            }

            .form-container, .table-container {
                padding: 1rem;
            }

            th, td {
                padding: 0.5rem;
            }

            .edit-btn, .delete-btn {
                padding: 0.3rem 0.6rem;
                font-size: 0.9rem;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1><i class="fas fa-users"></i> Trainee Management</h1>
        
        <div class="form-container">
            <form id="traineeForm">
                <div class="form-group">
                    <label for="name"><i class="fas fa-user"></i> Name</label>
                    <input type="text" id="name" required placeholder="Enter trainee name">
                </div>
                <div class="form-group">
                    <label for="email"><i class="fas fa-envelope"></i> Email</label>
                    <input type="email" id="email" required placeholder="Enter email address">
                </div>
                <div class="form-group">
                    <label for="phone"><i class="fas fa-phone"></i> Phone</label>
                    <input type="tel" id="phone" required placeholder="Enter phone number">
                </div>
                <div class="form-group">
                    <label for="course"><i class="fas fa-book"></i> Course</label>
                    <input type="text" id="course" required placeholder="Enter course name">
                </div>
                <button type="submit"><i class="fas fa-plus"></i> Add Trainee</button>
            </form>
        </div>

        <div class="table-container">
            <h2><i class="fas fa-list"></i> Trainee List</h2>
            <table id="traineeTable">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Course</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
    </div>

    <script>
        let trainees = JSON.parse(localStorage.getItem('trainees')) || [];
        let editIndex = -1;

        function displayTrainees() {
            const tbody = document.querySelector('#traineeTable tbody');
            tbody.innerHTML = '';
            
            trainees.forEach((trainee, index) => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${trainee.name}</td>
                    <td>${trainee.email}</td>
                    <td>${trainee.phone}</td>
                    <td>${trainee.course}</td>
                    <td>
                        <button class="edit-btn" onclick="editTrainee(${index})">Edit</button>
                        <button class="delete-btn" onclick="deleteTrainee(${index})">Delete</button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        }

        document.getElementById('traineeForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const trainee = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                course: document.getElementById('course').value
            };

            if (editIndex === -1) {
                trainees.push(trainee);
            } else {
                trainees[editIndex] = trainee;
                editIndex = -1;
                document.querySelector('button[type="submit"]').textContent = 'Add Trainee';
            }

            localStorage.setItem('trainees', JSON.stringify(trainees));
            this.reset();
            displayTrainees();
        });

        function deleteTrainee(index) {
            if (confirm('Are you sure you want to delete this trainee?')) {
                trainees.splice(index, 1);
                localStorage.setItem('trainees', JSON.stringify(trainees));
                displayTrainees();
            }
        }

        function editTrainee(index) {
            const trainee = trainees[index];
            document.getElementById('name').value = trainee.name;
            document.getElementById('email').value = trainee.email;
            document.getElementById('phone').value = trainee.phone;
            document.getElementById('course').value = trainee.course;
            
            editIndex = index;
            document.querySelector('button[type="submit"]').textContent = 'Update Trainee';
        }

        // Initial display
        displayTrainees();
    </script>
</body>
</html>
