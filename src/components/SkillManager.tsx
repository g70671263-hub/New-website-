import React, { useState } from 'react';
import { SkillItem, SkillCategory } from '../types';
import { Plus, Search, Trash2, Edit2, Sliders, ChevronDown } from 'lucide-react';

interface SkillManagerProps {
  skills: SkillItem[];
  onAddSkill: (skill: Omit<SkillItem, 'id'>) => void;
  onEditSkill: (skill: SkillItem) => void;
  onDeleteSkill: (id: string) => void;
  onUpdateValue: (id: string, type: 'current' | 'target', value: number) => void;
}

export const SkillManager: React.FC<SkillManagerProps> = ({
  skills,
  onAddSkill,
  onEditSkill,
  onDeleteSkill,
  onUpdateValue
}) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<SkillItem | null>(null);

  // Form states
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState<SkillCategory>('Language');
  const [formCurrent, setFormCurrent] = useState<number>(70);
  const [formTarget, setFormTarget] = useState<number>(90);
  const [formNotes, setFormNotes] = useState('');

  const categories: SkillCategory[] = ['Language', 'Framework', 'Architecture', 'Tooling', 'SoftSkill'];

  const filteredSkills = skills.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCategory === 'all' || s.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const openAddModal = () => {
    setEditingSkill(null);
    setFormName('');
    setFormCategory('Language');
    setFormCurrent(70);
    setFormTarget(90);
    setFormNotes('');
    setIsModalOpen(true);
  };

  const openEditModal = (skill: SkillItem) => {
    setEditingSkill(skill);
    setFormName(skill.name);
    setFormCategory(skill.category);
    setFormCurrent(skill.current);
    setFormTarget(skill.target);
    setFormNotes(skill.notes || '');
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    if (editingSkill) {
      onEditSkill({
        ...editingSkill,
        name: formName.trim(),
        category: formCategory,
        current: formCurrent,
        target: formTarget,
        notes: formNotes.trim()
      });
    } else {
      onAddSkill({
        name: formName.trim(),
        category: formCategory,
        current: formCurrent,
        target: formTarget,
        notes: formNotes.trim()
      });
    }
    setIsModalOpen(false);
  };

  const getCategoryColor = (cat: SkillCategory) => {
    switch (cat) {
      case 'Language': return 'text-sky-400';
      case 'Framework': return 'text-emerald-400';
      case 'Architecture': return 'text-amber-400';
      case 'Tooling': return 'text-pink-400';
      case 'SoftSkill': return 'text-indigo-400';
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-1.5">
            <Sliders className="w-4 h-4 text-sky-400" />
            Manage Competencies ({skills.length})
          </h3>
          <p className="text-xs text-slate-400">
            Adjust sliders to update your skill radar in real-time
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Skill
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-2 pt-1">
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search skills..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Category Tabs (Segmented Control) */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg overflow-x-auto text-xs">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap font-medium ${
              selectedCategory === 'all'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All ({skills.length})
          </button>
          {categories.map((cat) => {
            const count = skills.filter((s) => s.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap font-medium ${
                  selectedCategory === cat
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Skills List */}
      <div className="flex flex-col gap-2 max-h-[500px] overflow-y-auto pr-1">
        {filteredSkills.length === 0 ? (
          <div className="p-6 text-center text-xs text-slate-400 border border-dashed border-slate-800 rounded-lg">
            No matching skills found. Click "+ Add Skill" to create one.
          </div>
        ) : (
          filteredSkills.map((skill) => (
            <div
              key={skill.id}
              className="bg-slate-900/90 border border-slate-800 hover:border-slate-700/80 rounded-xl p-3 flex flex-col gap-2.5 transition-colors"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-slate-100">{skill.name}</span>
                  <span className="text-xs text-slate-500">·</span>
                  <span className={`text-[11px] font-medium ${getCategoryColor(skill.category)}`}>
                    {skill.category}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 font-mono text-xs tabular-nums">
                    <span className="text-sky-400 font-semibold">{skill.current}%</span>
                    <span className="text-slate-500">/</span>
                    <span className="text-purple-400">{skill.target}%</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEditModal(skill)}
                      className="p-1 text-slate-400 hover:text-slate-200 transition-colors"
                      title="Edit Skill Details"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDeleteSkill(skill.id)}
                      className="p-1 text-slate-400 hover:text-rose-400 transition-colors"
                      title="Delete Skill"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Real-time Sliders */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {/* Current Level */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>Current Level</span>
                    <span className="font-mono text-sky-400">{skill.current}%</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="100"
                    step="5"
                    value={skill.current}
                    onChange={(e) => onUpdateValue(skill.id, 'current', Number(e.target.value))}
                    className="w-full accent-sky-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Target Goal */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>Target Goal</span>
                    <span className="font-mono text-purple-400">{skill.target}%</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="100"
                    step="5"
                    value={skill.target}
                    onChange={(e) => onUpdateValue(skill.id, 'target', Number(e.target.value))}
                    className="w-full accent-purple-500 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
                  />
                </div>
              </div>

              {skill.notes && (
                <p className="text-[11px] text-slate-400 italic border-t border-slate-800/80 pt-1.5">
                  Focus: {skill.notes}
                </p>
              )}
            </div>
          ))
        )}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-md p-5 shadow-2xl">
            <h4 className="text-base font-semibold text-slate-100 mb-4">
              {editingSkill ? 'Edit Competency' : 'Add New Competency'}
            </h4>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Skill Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Kotlin, Docker, GraphQL"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Category</label>
                <select
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value as SkillCategory)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                >
                  <option value="Language">Language (Java, Kotlin, Rust, Python, etc.)</option>
                  <option value="Framework">Framework (React, Jetpack Compose, Spring)</option>
                  <option value="Architecture">Architecture (MVVM, Clean Architecture, Systems)</option>
                  <option value="Tooling">Tooling & DevOps (Git, Docker, Gradle, CI/CD)</option>
                  <option value="SoftSkill">Soft Skills (Communication, Mentorship, Agile)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1">
                    <span>Current</span>
                    <span className="font-mono text-sky-400">{formCurrent}%</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="100"
                    step="5"
                    value={formCurrent}
                    onChange={(e) => setFormCurrent(Number(e.target.value))}
                    className="w-full accent-sky-400 bg-slate-800 h-1.5 rounded-lg"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1">
                    <span>Target</span>
                    <span className="font-mono text-purple-400">{formTarget}%</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="100"
                    step="5"
                    value={formTarget}
                    onChange={(e) => setFormTarget(Number(e.target.value))}
                    className="w-full accent-purple-500 bg-slate-800 h-1.5 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Learning Plan / Notes</label>
                <input
                  type="text"
                  placeholder="e.g., Complete Android Room tutorial, read docs"
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex justify-end gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors"
                >
                  {editingSkill ? 'Save Changes' : 'Add Skill'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
