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
