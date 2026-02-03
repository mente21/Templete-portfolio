import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Check, X, ArrowLeft, MoreVertical, Edit2, Trash2, Settings, Calendar, Filter, Loader2, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { planApi, binApi, plannerCategoryApi } from '../utils/api';

const PlanPage = () => {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [activeFilter, setActiveFilter] = useState('All');
    const [isOptionsOpen, setIsOptionsOpen] = useState(false);
    const [showCompleted, setShowCompleted] = useState(true);
    const [sortBy, setSortBy] = useState('newest'); // 'newest', 'oldest', 'alphabetical'
    const [viewMode, setViewMode] = useState('list'); // 'list', 'scheduled'
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [newTask, setNewTask] = useState({ title: '', category: 'brain-dump', time: '', date: new Date().toISOString().split('T')[0] });
    
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [isEditingCategory, setIsEditingCategory] = useState(false);
    const [currentCategory, setCurrentCategory] = useState({ slug: '', title: '', subtitle: '', color: '#be185d', gradient: 'linear-gradient(135deg, #be185d, #db2777)' });
    
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            try {
                const [tasksData, categoriesData] = await Promise.all([
                    planApi.getAll(),
                    plannerCategoryApi.getAll()
                ]);
                setTasks(tasksData || []);
                setCategories(categoriesData || []);
                if (categoriesData && categoriesData.length > 0 && !activeFilter) {
                    setActiveFilter('All');
                }
            } catch (err) {
                console.error('Failed to load initial data:', err);
            } finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, []);

    const fetchTasks = async () => {
        try {
            const data = await planApi.getAll();
            setTasks(data || []);
        } catch (err) {
            console.error('Failed to fetch tasks:', err);
        }
    };

    const fetchCategories = async () => {
        try {
            const data = await plannerCategoryApi.getAll();
            setCategories(data || []);
        } catch (err) {
            console.error('Failed to fetch categories:', err);
        }
    };

    const handleAddTask = async () => {
        if (!newTask.title) return;
        try {
            const task = { ...newTask, completed: false };
            const savedTask = await planApi.create(task);
            setTasks([savedTask, ...tasks]);
            setIsAddModalOpen(false);
            setNewTask({ title: '', category: categories[0]?.slug || 'brain-dump', time: '', date: new Date().toISOString().split('T')[0] });
        } catch (err) {
            console.error('Failed to add task:', err);
        }
    };

    const handleEditTask = async () => {
        if (!editingTask || !editingTask.title) return;
        try {
            const updated = await planApi.update(editingTask.id, editingTask);
            setTasks(tasks.map(t => t.id === editingTask.id ? updated : t));
            setIsEditModalOpen(false);
            setEditingTask(null);
        } catch (err) {
            console.error('Failed to update task:', err);
        }
    };

    const toggleComplete = async (id) => {
        const task = tasks.find(t => t.id === id);
        if (!task) return;
        try {
            const updatedTask = { ...task, completed: !task.completed };
            await planApi.update(id, updatedTask);
            setTasks(tasks.map(t => t.id === id ? updatedTask : t));
        } catch (err) {
            console.error('Failed to update task:', err);
        }
    };

    const handleDeleteTask = async (id) => {
        if (!window.confirm('Move this task to bin?')) return;
        const taskToDelete = tasks.find(t => t.id === id);
        try {
            await binApi.moveToBin('plans', taskToDelete);
            await planApi.delete(id);
            setTasks(tasks.filter(t => t.id !== id));
        } catch (err) {
            console.error('Failed to delete task:', err);
        }
    };

    const handleClearAll = async () => {
        if (!window.confirm('This will delete ALL tasks Permanently. Are you sure?')) return;
        try {
            await planApi.clearAll();
            setTasks([]);
            setIsOptionsOpen(false);
        } catch (err) {
            console.error('Failed to clear tasks:', err);
        }
    };

    // Category Handlers
    const handleSaveCategory = async () => {
        if (!currentCategory.title) return;
        const slug = currentCategory.slug || currentCategory.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
        const catData = { ...currentCategory, slug };
        
        try {
            if (isEditingCategory) {
                const updated = await plannerCategoryApi.update(currentCategory.id, catData);
                setCategories(categories.map(c => c.id === currentCategory.id ? updated : c));
            } else {
                const saved = await plannerCategoryApi.create(catData);
                setCategories([...categories, saved]);
            }
            setIsCategoryModalOpen(false);
            setCurrentCategory({ slug: '', title: '', subtitle: '', color: '#be185d', gradient: 'linear-gradient(135deg, #be185d, #db2777)' });
        } catch (err) {
            console.error('Failed to save category:', err);
            alert(`Failed to save category: ${err.message}`);
        }
    };

    const handleDeleteCategory = async (id, slug) => {
        if (!window.confirm(`Delete "${slug}" category? Tasks in this category will remain but might lose their color association.`)) return;
        try {
            await plannerCategoryApi.delete(id);
            setCategories(categories.filter(c => c.id !== id));
            if (activeFilter === slug) setActiveFilter('All');
        } catch (err) {
            console.error('Failed to delete category:', err);
        }
    };

    const countTasks = (catSlug) => tasks.filter(t => t.category === catSlug && !t.completed).length;

    const getSortedTasks = (list) => {
        const sorted = [...list];
        if (sortBy === 'newest') return sorted.sort((a, b) => new Date(b.created_at || b.date) - new Date(a.created_at || a.date));
        if (sortBy === 'oldest') return sorted.sort((a, b) => new Date(a.created_at || a.date) - new Date(b.created_at || b.date));
        if (sortBy === 'alphabetical') return sorted.sort((a, b) => a.title.localeCompare(b.title));
        return sorted;
    };

    const filteredTasks = activeFilter === 'All'
        ? tasks
        : tasks.filter(t => t.category === activeFilter);

    const activeTasks = getSortedTasks(filteredTasks.filter(t => !t.completed));
    const completedTasks = getSortedTasks(filteredTasks.filter(t => t.completed));

    // Grasp gradients/colors from the category
    const getCategoryStyles = (catSlug) => {
        const cat = categories.find(c => c.slug === catSlug);
        return cat || { color: '#888', gradient: 'linear-gradient(135deg, #333, #444)', title: catSlug };
    };

    return (
        <div className="plan-page-root" style={{ backgroundColor: '#121212', minHeight: '100vh', padding: '40px', fontFamily: "'Inter', sans-serif", color: '#fff' }}>
            
            {/* Header */}
            <div className="plan-header">
                <div className="header-left">
                    <button
                        onClick={() => navigate('/')}
                        className="back-btn"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <h1 className="plan-title">Plan & Routines</h1>
                </div>

                <div className="mobile-menu-toggle">
                    <button 
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="hamburger-btn"
                    >
                        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
                
                <div className="header-actions">
                    <button 
                        onClick={() => setViewMode(viewMode === 'list' ? 'scheduled' : 'list')}
                        className={`view-mode-btn ${viewMode === 'scheduled' ? 'active' : ''}`}
                    >
                        <Calendar size={18} /> {viewMode === 'scheduled' ? 'List View' : 'Scheduled'}
                    </button>
                    
                    <div style={{ position: 'relative' }}>
                        <button
                            onClick={() => setIsOptionsOpen(!isOptionsOpen)}
                            className="options-btn"
                        >
                            Options
                        </button>
                        <AnimatePresence>
                            {isOptionsOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    style={{ position: 'absolute', top: '100%', right: 0, marginTop: '10px', background: '#1a1a1a', border: '1px solid #333', borderRadius: '12px', padding: '8px', width: '220px', zIndex: 100, boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}
                                >
                                    <div style={{ padding: '12px', fontSize: '14px', color: '#eee', cursor: 'pointer', borderRadius: '8px', display: 'flex', justifyContent: 'space-between' }} onClick={() => setShowCompleted(!showCompleted)} className="hover-item">
                                        <span>Show Completed</span>
                                        {showCompleted && <Check size={16} color="#22c55e" />}
                                    </div>
                                    <div style={{ borderBottom: '1px solid #333', margin: '4px 0' }}></div>
                                    <div style={{ padding: '8px 12px', fontSize: '12px', color: '#666', textTransform: 'uppercase', letterSpacing: '1px' }}>Sort By</div>
                                    <div style={{ padding: '10px 12px', fontSize: '14px', color: sortBy === 'newest' ? '#fff' : '#888', cursor: 'pointer', borderRadius: '8px' }} onClick={() => setSortBy('newest')} className="hover-item">Newest First</div>
                                    <div style={{ padding: '10px 12px', fontSize: '14px', color: sortBy === 'alphabetical' ? '#fff' : '#888', cursor: 'pointer', borderRadius: '8px' }} onClick={() => setSortBy('alphabetical')} className="hover-item">Alphabetical</div>
                                    
                                    <div style={{ borderBottom: '1px solid #333', margin: '4px 0' }}></div>
                                    <div style={{ padding: '12px', fontSize: '14px', color: '#ef4444', cursor: 'pointer', borderRadius: '8px', fontWeight: 600 }} onClick={handleClearAll} className="hover-item">
                                        Clear All Tasks
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            <div className="plan-content-wrapper">
                {/* Sidebar - Categories */}
                <div className={`plan-sidebar ${isSidebarOpen ? 'open' : ''}`}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h2 style={{ fontSize: '20px', fontWeight: 700 }}>Categories</h2>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button 
                                onClick={() => { setIsEditingCategory(false); setCurrentCategory({ slug: '', title: '', subtitle: '', color: '#be185d', gradient: 'linear-gradient(135deg, #be185d, #db2777)' }); setIsCategoryModalOpen(true); }}
                                style={{ background: '#333', border: 'none', color: '#fff', width: '30px', height: '30px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            >
                                <Plus size={18} />
                            </button>
                            <button 
                                className="mobile-close-sidebar"
                                onClick={() => setIsSidebarOpen(false)}
                                style={{ background: '#333', border: 'none', color: '#fff', width: '30px', height: '30px', borderRadius: '50%', cursor: 'pointer', display: 'none', alignItems: 'center', justifyContent: 'center' }}
                            >
                                <X size={18} />
                            </button>
                        </div>
                    </div>

                    <div className="categories-list">
                        <motion.div
                            whileHover={{ x: 5 }}
                            onClick={() => { setActiveFilter('All'); setIsSidebarOpen(false); }}
                            className="category-item-all"
                            style={{ 
                                padding: '16px', 
                                background: activeFilter === 'All' ? '#fff' : '#1e1e1e', 
                                color: activeFilter === 'All' ? '#000' : '#fff', 
                                borderRadius: '14px', 
                                cursor: 'pointer', 
                                border: '1px solid #333', 
                                transition: 'all 0.2s' 
                            }}
                        >
                            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700 }}>All Tasks</h3>
                            <p style={{ margin: '4px 0 0', opacity: 0.6, fontSize: '13px' }}>{tasks.filter(t => !t.completed).length} active</p>
                        </motion.div>

                        {categories.map(cat => (
                            <motion.div
                                key={cat.id}
                                whileHover={{ x: 5 }}
                                style={{ position: 'relative', overflow: 'hidden' }}
                            >
                                <div
                                    onClick={() => { setActiveFilter(cat.slug); setIsSidebarOpen(false); }}
                                    className="category-item-card"
                                    style={{ 
                                        padding: '20px', 
                                        background: cat.gradient, 
                                        borderRadius: '16px', 
                                        cursor: 'pointer', 
                                        border: activeFilter === cat.slug ? '2px solid #fff' : '1px solid rgba(255,255,255,0.1)', 
                                        boxShadow: '0 4px 15px rgba(0,0,0,0.2)', 
                                        transition: 'all 0.2s' 
                                    }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800 }}>{cat.title}</h3>
                                        <div style={{ display: 'flex', gap: '5px' }}>
                                            <button 
                                                onClick={(e) => { e.stopPropagation(); setIsEditingCategory(true); setCurrentCategory(cat); setIsCategoryModalOpen(true); }}
                                                style={{ background: 'rgba(0,0,0,0.2)', border: 'none', color: '#fff', padding: '5px', borderRadius: '4px', cursor: 'pointer' }}
                                            >
                                                <Edit2 size={12} />
                                            </button>
                                            <button 
                                                onClick={(e) => { e.stopPropagation(); handleDeleteCategory(cat.id, cat.slug); }}
                                                style={{ background: 'rgba(0,0,0,0.2)', border: 'none', color: '#ff4444', padding: '5px', borderRadius: '4px', cursor: 'pointer' }}
                                            >
                                                <Trash2 size={12} />
                                            </button>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontSize: '12px', fontWeight: 600, opacity: 0.9 }}>
                                        <span>{countTasks(cat.slug)} tasks</span>
                                        <span>{cat.subtitle}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Main Content - Tasks */}
                <div className="plan-main">
                    {isLoading ? (
                        <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Loader2 className="animate-spin" size={40} color="#555" />
                        </div>
                    ) : (
                        <>
                            <div className="main-header">
                                <h2 style={{ fontSize: '24px', fontWeight: 800, margin: 0 }}>
                                    {viewMode === 'scheduled' ? 'Scheduled Timeline' : (activeFilter === 'All' ? 'Upcoming Focus' : categories.find(c => c.slug === activeFilter)?.title)}
                                </h2>
                                <p style={{ color: '#666', marginTop: '4px', fontSize: '14px' }}>
                                    {viewMode === 'scheduled' ? 'Tasks organized by date' : new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                                </p>
                            </div>

                            <div className="tasks-container">
                                {viewMode === 'list' ? (
                                    <>
                                        <h3 className="section-label">Active Tasks</h3>
                                        {activeTasks.length === 0 && (
                                            <div className="empty-state">
                                                <p style={{ color: '#555', margin: 0 }}>No active tasks found.</p>
                                            </div>
                                        )}
                                        {activeTasks.map(task => (
                                            <TaskItem 
                                                key={task.id} 
                                                task={task} 
                                                catStyles={getCategoryStyles(task.category)} 
                                                onToggle={toggleComplete} 
                                                onDelete={handleDeleteTask}
                                                onEdit={(t) => { setEditingTask(t); setIsEditModalOpen(true); }}
                                            />
                                        ))}

                                        {showCompleted && completedTasks.length > 0 && (
                                            <>
                                                <h3 className="section-label" style={{ marginTop: '30px' }}>Completed</h3>
                                                {completedTasks.map(task => (
                                                    <TaskItem 
                                                        key={task.id} 
                                                        task={task} 
                                                        catStyles={getCategoryStyles(task.category)} 
                                                        onToggle={toggleComplete} 
                                                        onDelete={handleDeleteTask}
                                                        onEdit={(t) => { setEditingTask(t); setIsEditModalOpen(true); }}
                                                        isCompleted
                                                    />
                                                ))}
                                            </>
                                        )}
                                    </>
                                ) : (
                                    /* Scheduled View - Grouped by Date */
                                    <div className="scheduled-view">
                                        {Object.entries(
                                            tasks.reduce((groups, task) => {
                                                const date = task.date || 'No Date';
                                                if (!groups[date]) groups[date] = [];
                                                groups[date].push(task);
                                                return groups;
                                            }, {})
                                        ).sort((a, b) => new Date(a[0]) - new Date(b[0])).map(([date, dateTasks]) => (
                                            <div key={date} style={{ marginBottom: '30px' }}>
                                                <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#be185d', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                    <Calendar size={14} /> {date === 'No Date' ? 'Unscheduled' : new Date(date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                                                </h3>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                                    {dateTasks.filter(t => showCompleted || !t.completed).map(task => (
                                                        <TaskItem 
                                                            key={task.id} 
                                                            task={task} 
                                                            catStyles={getCategoryStyles(task.category)} 
                                                            onToggle={toggleComplete} 
                                                            onDelete={handleDeleteTask}
                                                            onEdit={(t) => { setEditingTask(t); setIsEditModalOpen(true); }}
                                                            isCompleted={task.completed}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Float Add Button */}
            <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsAddModalOpen(true)}
                className="add-task-float"
            >
                <Plus size={32} />
            </motion.button>

            {/* Modals */}
            <AnimatePresence>
                {/* Add/Edit Task Modal */}
                {(isAddModalOpen || isEditModalOpen) && (
                    <Modal onClose={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); setEditingTask(null); }}>
                        <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '25px' }}>{isEditModalOpen ? 'Edit Task' : 'New Task'}</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div>
                                <label style={{ display: 'block', color: '#888', marginBottom: '8px', fontSize: '13px', fontWeight: 600 }}>What needs to be done?</label>
                                <textarea
                                    value={isEditModalOpen ? editingTask?.title : newTask.title}
                                    onChange={(e) => isEditModalOpen ? setEditingTask({ ...editingTask, title: e.target.value }) : setNewTask({ ...newTask, title: e.target.value })}
                                    placeholder="Task description..."
                                    style={{ width: '100%', minHeight: '100px', background: '#111', border: '1px solid #333', borderRadius: '12px', color: '#fff', padding: '15px', fontSize: '16px', outline: 'none' }}
                                />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                <div>
                                    <label style={{ display: 'block', color: '#888', marginBottom: '8px', fontSize: '13px', fontWeight: 600 }}>Category</label>
                                    <select
                                        value={isEditModalOpen ? editingTask?.category : newTask.category}
                                        onChange={(e) => isEditModalOpen ? setEditingTask({ ...editingTask, category: e.target.value }) : setNewTask({ ...newTask, category: e.target.value })}
                                        style={{ width: '100%', background: '#111', border: '1px solid #333', borderRadius: '10px', color: '#fff', padding: '12px', outline: 'none' }}
                                    >
                                        {categories.map(cat => (
                                            <option key={cat.id} value={cat.slug}>{cat.title}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label style={{ display: 'block', color: '#888', marginBottom: '8px', fontSize: '13px', fontWeight: 600 }}>Target Time/Date</label>
                                    <input
                                        type="text"
                                        value={isEditModalOpen ? editingTask?.time : newTask.time}
                                        onChange={(e) => isEditModalOpen ? setEditingTask({ ...editingTask, time: e.target.value }) : setNewTask({ ...newTask, time: e.target.value })}
                                        placeholder="e.g. 10:00 AM"
                                        style={{ width: '100%', background: '#111', border: '1px solid #333', borderRadius: '10px', color: '#fff', padding: '12px', outline: 'none' }}
                                    />
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
                                <button
                                    onClick={() => isEditModalOpen ? handleEditTask() : handleAddTask()}
                                    style={{ flex: 1, background: '#fff', color: '#000', border: 'none', padding: '14px', borderRadius: '12px', fontWeight: 800, cursor: 'pointer', fontSize: '15px' }}
                                >
                                    {isEditModalOpen ? 'Save Changes' : 'Create Task'}
                                </button>
                                <button
                                    onClick={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); setEditingTask(null); }}
                                    style={{ background: '#222', color: '#888', border: '1px solid #333', padding: '14px 20px', borderRadius: '12px', fontWeight: 600, cursor: 'pointer' }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </Modal>
                )}

                {/* Category Modal */}
                {isCategoryModalOpen && (
                    <Modal onClose={() => setIsCategoryModalOpen(false)}>
                        <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '25px' }}>{isEditingCategory ? 'Edit Category' : 'New Category'}</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div>
                                <label style={{ display: 'block', color: '#888', marginBottom: '8px', fontSize: '13px', fontWeight: 600 }}>Category Name</label>
                                <input
                                    value={currentCategory.title}
                                    onChange={(e) => setCurrentCategory({ ...currentCategory, title: e.target.value })}
                                    style={{ width: '100%', background: '#111', border: '1px solid #333', borderRadius: '12px', color: '#fff', padding: '15px', fontSize: '16px', outline: 'none' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', color: '#888', marginBottom: '8px', fontSize: '13px', fontWeight: 600 }}>Subtitle</label>
                                <input
                                    value={currentCategory.subtitle}
                                    onChange={(e) => setCurrentCategory({ ...currentCategory, subtitle: e.target.value })}
                                    style={{ width: '100%', background: '#111', border: '1px solid #333', borderRadius: '12px', color: '#fff', padding: '15px', fontSize: '16px', outline: 'none' }}
                                />
                            </div>
                            <div style={{ display: 'flex', gap: '15px' }}>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'block', color: '#888', marginBottom: '8px', fontSize: '13px', fontWeight: 600 }}>Main Color (Hex)</label>
                                    <input
                                        value={currentCategory.color}
                                        onChange={(e) => setCurrentCategory({ ...currentCategory, color: e.target.value })}
                                        style={{ width: '100%', background: '#111', border: '1px solid #333', borderRadius: '12px', color: '#fff', padding: '15px', fontSize: '16px', outline: 'none' }}
                                    />
                                </div>
                                <div style={{ width: '60px', height: '60px', borderRadius: '12px', background: currentCategory.color, marginTop: '25px', border: '4px solid #333' }}></div>
                            </div>
                            <div>
                                <label style={{ display: 'block', color: '#888', marginBottom: '8px', fontSize: '13px', fontWeight: 600 }}>CSS Gradient</label>
                                <input
                                    value={currentCategory.gradient}
                                    onChange={(e) => setCurrentCategory({ ...currentCategory, gradient: e.target.value })}
                                    style={{ width: '100%', background: '#111', border: '1px solid #333', borderRadius: '12px', color: '#fff', padding: '15px', fontSize: '14px', outline: 'none', fontFamily: 'monospace' }}
                                />
                            </div>
                            <button
                                onClick={handleSaveCategory}
                                style={{ background: '#fff', color: '#000', border: 'none', padding: '14px', borderRadius: '12px', fontWeight: 800, cursor: 'pointer', marginTop: '10px' }}
                            >
                                Save Category
                            </button>
                        </div>
                    </Modal>
                )}
            </AnimatePresence>

            <style>{`
                .plan-page-root {
                    padding: 40px !important;
                }
                .plan-content-wrapper {
                    display: flex;
                    gap: 30px;
                    height: calc(100vh - 160px);
                }
                .plan-sidebar {
                    width: 350px;
                    overflow-y: auto;
                    padding-right: 10px;
                }
                .categories-list {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }
                .plan-main {
                    flex: 1;
                    background: #000;
                    border-radius: 24px;
                    border: 1px solid #222;
                    padding: 30px;
                    overflow-y: auto;
                }
                .tasks-container {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                }
                .section-label {
                    font-size: 12px;
                    font-weight: 800;
                    color: #444;
                    text-transform: uppercase;
                    letter-spacing: 1.5px;
                }
                .empty-state {
                    padding: 40px;
                    text-align: center;
                    background: #0a0a0a;
                    borderRadius: 16px;
                    border: 1px dashed #333;
                }
                .add-task-float {
                    position: fixed;
                    bottom: 40px;
                    right: 40px;
                    width: 64px;
                    height: 64px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #d946ef, #a21caf);
                    color: #fff;
                    border: none;
                    box-shadow: 0 10px 25px rgba(217, 70, 239, 0.4);
                    cursor: pointer;
                    display: flex;
                    alignItems: center;
                    justifyContent: center;
                    zIndex: 50;
                }

                @media (max-width: 1024px) {
                    .plan-sidebar {
                        width: 280px;
                    }
                }

                .plan-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 40px;
                }
                .header-left {
                    display: flex;
                    align-items: center;
                }
                .back-btn {
                    margin-right: 20px;
                    cursor: pointer;
                    color: #fff;
                    background: #222;
                    border: 1px solid #333;
                    width: 40px;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 12px;
                }
                .plan-title {
                    margin: 0;
                    font-size: 28px;
                    font-weight: 800;
                }
                .header-actions {
                    display: flex;
                    gap: 12px;
                }
                .view-mode-btn {
                    background: #222;
                    color: #fff;
                    border: 1px solid #333;
                    padding: 10px 18px;
                    border-radius: 10px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-weight: 600;
                    font-size: 14px;
                }
                .view-mode-btn.active {
                    background: #fff;
                    color: #000;
                }
                .options-btn {
                    background: #222;
                    color: #fff;
                    border: 1px solid #333;
                    padding: 10px 18px;
                    border-radius: 10px;
                    cursor: pointer;
                    font-weight: 600;
                    font-size: 14px;
                }
                .modal-content {
                    width: 100%;
                    max-width: 500px;
                    background-color: #161616;
                    border-radius: 24px;
                    padding: 40px;
                    border: 1px solid #333;
                    box-shadow: 0 20px 50px rgba(0,0,0,0.6);
                }

                .mobile-menu-toggle {
                    display: none;
                }
                .hamburger-btn {
                    background: #222;
                    color: #fff;
                    border: 1px solid #333;
                    width: 44px;
                    height: 44px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 12px;
                    cursor: pointer;
                }

                @media (max-width: 768px) {
                    .mobile-menu-toggle {
                        display: block;
                        position: absolute;
                        right: 20px;
                        top: 20px;
                    }
                    .plan-header {
                        position: relative;
                        padding-right: 60px;
                    }
                    .plan-page-root {
                        padding: 20px !important;
                    }
                    .plan-header {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 20px;
                        margin-bottom: 30px;
                    }
                    .header-actions {
                        width: 100%;
                        justify-content: space-between;
                    }
                    .plan-content-wrapper {
                        flex-direction: column;
                        height: auto;
                        gap: 20px;
                        position: relative;
                    }
                    .plan-sidebar {
                        position: fixed;
                        top: 0;
                        left: -100%;
                        width: 85%;
                        max-width: 320px;
                        height: 100vh;
                        background: #161616;
                        z-index: 1000;
                        padding: 30px 20px;
                        box-shadow: 20px 0 50px rgba(0,0,0,0.8);
                        transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                        border-right: 1px solid #333;
                        margin-bottom: 0;
                        max-height: none;
                    }
                    .plan-sidebar.open {
                        left: 0;
                    }
                    .mobile-close-sidebar {
                        display: flex !important;
                    }
                    .categories-list {
                        display: flex;
                        flex-direction: column;
                        gap: 12px;
                        grid-template-columns: none;
                    }
                    .plan-main {
                        padding: 20px;
                        border-radius: 16px;
                        height: auto;
                        min-height: 500px;
                    }
                    .modal-content {
                        padding: 30px 20px;
                        border-radius: 20px;
                    }
                    .add-task-float {
                        bottom: 20px;
                        right: 20px;
                        width: 54px;
                        height: 54px;
                    }
                }

                @media (max-width: 480px) {
                    .back-btn {
                        margin-right: 12px;
                        width: 36px;
                        height: 36px;
                    }
                    .plan-title {
                        font-size: 20px !important;
                    }
                    .header-actions {
                        flex-wrap: wrap;
                    }
                    .view-mode-btn, .options-btn {
                        padding: 8px 12px;
                        font-size: 12px;
                    }
                }

                .hover-item:hover { background: #222; }
                .animate-spin { animation: spin 1s linear infinite; }
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                ::-webkit-scrollbar { width: 5px; }
                ::-webkit-scrollbar-track { background: transparent; }
                ::-webkit-scrollbar-thumb { background: #333; borderRadius: 10px; }
            `}</style>
        </div>
    );
};

// Sub-components for cleaner code
const TaskItem = ({ task, catStyles, onToggle, onDelete, onEdit, isCompleted }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{ display: 'flex', gap: '15px', padding: '18px', backgroundColor: '#181818', borderRadius: '18px', borderLeft: `6px solid ${catStyles.color}`, border: '1px solid #222', alignItems: 'center', opacity: isCompleted ? 0.6 : 1 }}
    >
        <div
            onClick={() => onToggle(task.id)}
            style={{ width: '26px', height: '26px', borderRadius: '50%', background: isCompleted ? '#22c55e' : 'transparent', border: isCompleted ? 'none' : '2px solid #333', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
        >
            {isCompleted && <Check size={16} color="#000" />}
        </div>
        
        <div style={{ flex: 1 }}>
            <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 600, color: isCompleted ? '#666' : '#fff', textDecoration: isCompleted ? 'line-through' : 'none' }}>{task.title}</h4>
            <div style={{ display: 'flex', gap: '10px', fontSize: '11px', color: '#555', marginTop: '6px', fontWeight: 700, textTransform: 'uppercase' }}>
                <span style={{ color: catStyles.color }}>{catStyles.title}</span>
                <span>•</span>
                <span>{task.time || 'Anytime'}</span>
            </div>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => onEdit(task)} style={{ background: 'none', border: 'none', color: '#444', cursor: 'pointer' }}><Edit2 size={16} /></button>
            <button onClick={() => onDelete(task.id)} style={{ background: 'none', border: 'none', color: '#444', cursor: 'pointer' }}><Trash2 size={16} /></button>
        </div>
    </motion.div>
);

const Modal = ({ children, onClose }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}
        onClick={onClose}
    >
        <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
        >
            {children}
        </motion.div>
    </motion.div>
);

export default PlanPage;
