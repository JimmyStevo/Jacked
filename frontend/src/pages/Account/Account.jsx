import './Account.css'
import MainNavigationBar from '../../components/NavBar/MainNavigationBar';
import SecondNavigationBar from '../../components/NavBar/SecondNavigationBar';
import { useState } from 'react';

const Account = () => {
    // State to manage form inputs
    const [userInfo, setUserInfo] = useState({
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1 (555) 123-4567',
        address: '123 Fitness Ave, Gym City, GC 12345'
    });

    // State to manage if we're editing
    const [isEditing, setIsEditing] = useState(false);

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInfo({
            ...userInfo,
            [name]: value
        });
    };

    // Handle save
    const handleSave = () => {
        setIsEditing(false);
        // Here you would typically send data to your backend
        console.log('User info saved:', userInfo);
    };

    // Handle cancel edit
    const handleCancel = () => {
        setIsEditing(false);
    };

    return (
        <>
            <MainNavigationBar />
            <SecondNavigationBar />

            <div className='account-container'>
                {/* Personal Details Section */}
                <div className='account-section'>
                    <h2>Personal Details</h2>
                    <div className='info-card'>
                        {isEditing ? (
                            <div className='form-group'>
                                <div className='form-row'>
                                    <div className='form-field'>
                                        <label>Name</label>
                                        <input 
                                            type='text' 
                                            name='name' 
                                            value={userInfo.name}
                                            onChange={handleInputChange}
                                            placeholder='Enter your name'
                                        />
                                    </div>
                                    <div className='form-field'>
                                        <label>Email</label>
                                        <input 
                                            type='email' 
                                            name='email' 
                                            value={userInfo.email}
                                            onChange={handleInputChange}
                                            placeholder='Enter your email'
                                        />
                                    </div>
                                </div>

                                <div className='form-row'>
                                    <div className='form-field'>
                                        <label>Phone</label>
                                        <input 
                                            type='tel' 
                                            name='phone' 
                                            value={userInfo.phone}
                                            onChange={handleInputChange}
                                            placeholder='Enter your phone'
                                        />
                                    </div>
                                    <div className='form-field'>
                                        <label>Address</label>
                                        <input 
                                            type='text' 
                                            name='address' 
                                            value={userInfo.address}
                                            onChange={handleInputChange}
                                            placeholder='Enter your address'
                                        />
                                    </div>
                                </div>

                                <div className='button-group'>
                                    <button onClick={handleSave} className='btn-save'>Save Changes</button>
                                    <button onClick={handleCancel} className='btn-cancel'>Cancel</button>
                                </div>
                            </div>
                        ) : (
                            <div className='info-display'>
                                <div className='info-item'>
                                    <span className='label'>Name:</span>
                                    <span className='value'>{userInfo.name}</span>
                                </div>
                                <div className='info-item'>
                                    <span className='label'>Email:</span>
                                    <span className='value'>{userInfo.email}</span>
                                </div>
                                <div className='info-item'>
                                    <span className='label'>Phone:</span>
                                    <span className='value'>{userInfo.phone}</span>
                                </div>
                                <div className='info-item'>
                                    <span className='label'>Address:</span>
                                    <span className='value'>{userInfo.address}</span>
                                </div>
                                <button onClick={() => setIsEditing(true)} className='btn-edit'>Edit Profile</button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Account Settings Section */}
                <div className='account-section'>
                    <h2>Account Settings & Preferences</h2>
                    <div className='settings-card'>
                        <div className='setting-item'>
                            <div className='setting-info'>
                                <h3>Email Notifications</h3>
                                <p>Receive updates via email</p>
                            </div>
                            <input type='checkbox' defaultChecked={true} />
                        </div>

                        <div className='setting-item'>
                            <div className='setting-info'>
                                <h3>Workout Reminders</h3>
                                <p>Get reminders for your workouts</p>
                            </div>
                            <input type='checkbox' defaultChecked={true} />
                        </div>

                        <div className='setting-item'>
                            <div className='setting-info'>
                                <h3>Privacy Mode</h3>
                                <p>Keep your progress private</p>
                            </div>
                            <input type='checkbox' defaultChecked={false} />
                        </div>

                        <div className='setting-item'>
                            <div className='setting-info'>
                                <h3>Dark Mode</h3>
                                <p>Use dark theme</p>
                            </div>
                            <input type='checkbox' defaultChecked={false} />
                        </div>
                    </div>
                </div>

                {/* Account Management Section */}
                <div className='account-section'>
                    <h2>Account Management</h2>
                    <div className='management-card'>
                        <button className='btn-action btn-password'>Change Password</button>
                        <button className='btn-action btn-activity'>View Login Activity</button>
                        <button className='btn-action btn-delete'>Delete Account</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Account;
