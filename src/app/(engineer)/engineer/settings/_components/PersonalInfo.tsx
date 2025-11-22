'use client'

import { useEffect, useState } from 'react'
import { Download, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import {
  useEingineerProfileInfoUpdate,
  useGetAllIndustry,
  useGetAllService,
  useProfileQuery,
} from '@/hooks/apiCalling'
import { useSession } from 'next-auth/react'

interface FormData {
  firstName: string
  lastName: string
  emailAddress: string
  professionalTitle: string
  githubLink: string
  service: string
  location: string
  experience: string
  industriesOfInterest: string
  rate: string
  skills: string[]
  bio: string
  uploadCV: File | null          // <-- File object, not string
  educationCertifications: File | null   // <-- File object, not string
}

export default function PersonalInformationForm() {
  const { data: session } = useSession()
  const token = (session?.user as { accessToken: string })?.accessToken

  const { data: profileResp } = useProfileQuery(token)
  const profileData = profileResp?.data

  const updateMutation = useEingineerProfileInfoUpdate(token)

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    emailAddress: '',
    professionalTitle: '',
    githubLink: '',
    service: '',
    location: '',
    experience: '',
    industriesOfInterest: '',
    rate: '',
    skills: [],
    bio: '',
    uploadCV: null,
    educationCertifications: null,
  })

  const [skillInput, setSkillInput] = useState('')

console.log(profileData)
  useEffect(() => {
    if (profileData) {
      setFormData({
        firstName: profileData.firstName ?? '',
        lastName: profileData.lastName ?? '',
        emailAddress: profileData.email ?? '',
        professionalTitle: profileData.professionTitle ?? '',
        githubLink: profileData.gitHubLink ?? '',
        service: profileData.service ?? '',
        location: profileData.location ?? '',
        experience: profileData.experience ?? '',
        industriesOfInterest: profileData.industry ?? '',
        rate: profileData.rate ? String(profileData.rate) : '',
        skills: profileData.skills ?? [],
        bio: profileData.bio ?? '',
        uploadCV: null,
        educationCertifications: null,
      })
    }
  }, [profileData])

  const allService = useGetAllService()
  const allIndustries = useGetAllIndustry()


  const handleAddSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData((p) => ({ ...p, skills: [...p.skills, skillInput.trim()] }))
      setSkillInput('')
    }
  }

  const handleRemoveSkill = (skill: string) => {
    setFormData((p) => ({ ...p, skills: p.skills.filter((s) => s !== skill) }))
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((p) => ({ ...p, [name]: value }))
  }

  const handleSelectChange = (name: keyof FormData, value: string) => {
    setFormData((p) => ({ ...p, [name]: value }))
  }

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: 'uploadCV' | 'educationCertifications'
  ) => {
    const file = e.target.files?.[0] ?? null
    setFormData((p) => ({ ...p, [field]: file }))
  }


  const handleSaveChanges = () => {
    const payload = new FormData()

    // Text fields (exact names the backend expects)
    payload.append('firstName', formData.firstName)
    payload.append('lastName', formData.lastName)
    payload.append('email', formData.emailAddress)
    payload.append('professionTitle', formData.professionalTitle)
    payload.append('gitHubLink', formData.githubLink)
    payload.append('service', formData.service)
    payload.append('location', formData.location)
    payload.append('experience', formData.experience)
    payload.append('industry', formData.industriesOfInterest)
    payload.append('rate', formData.rate)
    payload.append('bio', formData.bio)

    // Skills – send as repeated field
    formData.skills.forEach((s) => payload.append('skills', s))

    // Files (only if a new file was selected)
    if (formData.uploadCV) payload.append('cv', formData.uploadCV)
    if (formData.educationCertifications)
      payload.append('certifications', formData.educationCertifications)

    updateMutation.mutate(payload)
  }


  return (
    <Card className="bg-white border-0 shadow-sm">
      <CardHeader className="pb-8">
        <CardTitle className="text-2xl font-semibold text-[#343A40]">
          Personal Information
        </CardTitle>
        <CardDescription className="text-sm text-[#68706A] mt-1">
          Manage your personal information and profile details.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-6">
          {/* ---------- Name ---------- */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="Maria Jasmin"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Jasmin"
              />
            </div>
          </div>

          {/* ---------- Row 2 ---------- */}
          <div className="grid grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="emailAddress">Email Address</Label>
              <Input
                id="emailAddress"
                name="emailAddress"
                value={formData.emailAddress}
                onChange={handleInputChange}
                placeholder="you@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="professionalTitle">Professional Title</Label>
              <Input
                id="professionalTitle"
                name="professionalTitle"
                value={formData.professionalTitle}
                onChange={handleInputChange}
                placeholder="Senior Software Engineer"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="githubLink">GitHub Link</Label>
              <Input
                id="githubLink"
                name="githubLink"
                value={formData.githubLink}
                onChange={handleInputChange}
                placeholder="https://github.com/..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="service">Service</Label>
              <Select
                value={formData.service}
                onValueChange={(v) => handleSelectChange('service', v)}
              >
                <SelectTrigger id="service">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {allService.data?.data?.map((s) => (
                    <SelectItem key={s._id} value={s._id}>
                      {s.serviceName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* ---------- Row 3 ---------- */}
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="San Francisco, CA"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience">Experience (years)</Label>
              <Input
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                placeholder="5"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="industriesOfInterest">Industries of Interest</Label>
              <Select
                value={formData.industriesOfInterest}
                onValueChange={(v) => handleSelectChange('industriesOfInterest', v)}
              >
                <SelectTrigger id="industriesOfInterest">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {allIndustries.data?.data?.map((i) => (
                    <SelectItem key={i._id} value={i._id}>
                      {i.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* ---------- Designation & Rate ---------- */}
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="rate">Rate</Label>
              <Input
                id="rate"
                name="rate"
                value={formData.rate}
                onChange={handleInputChange}
                placeholder="$150/hr"
              />
            </div>
          </div>

          {/* ---------- Skills ---------- */}
          <div className="space-y-2">
            <Label>Skills</Label>
            <div className="flex gap-2">
              <Input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (handleAddSkill(), e.preventDefault())}
                placeholder="Add a skill (press Enter)"
                className="flex-1"
              />
              <Button type="button" onClick={handleAddSkill} variant="outline">
                Add
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {formData.skills.map((s) => (
                <div
                  key={s}
                  className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-3 py-1.5"
                >
                  <span className="text-sm text-blue-700 font-medium">{s}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(s)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* ---------- Bio ---------- */}
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              rows={3}
              placeholder="A short description about yourself..."
            />
          </div>

          {/* ---------- Files ---------- */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="uploadCV">Upload CV (PDF)</Label>
              <label className="flex cursor-pointer items-center justify-between rounded-md border border-gray-300 px-4 py-2.5 text-sm text-gray-500 hover:bg-gray-50">
                <span>
                  {formData.uploadCV ? formData.uploadCV.name : 'PDF Only'}
                </span>
                <Download className="h-4 w-4" />
                <input
                  id="uploadCV"
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={(e) => handleFileChange(e, 'uploadCV')}
                />
              </label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="educationCertifications">
                Education & Certifications (PDF)
              </Label>
              <label className="flex cursor-pointer items-center justify-between rounded-md border border-gray-300 px-4 py-2.5 text-sm text-gray-500 hover:bg-gray-50">
                <span>
                  {formData.educationCertifications
                    ? formData.educationCertifications.name
                    : 'PDF Only'}
                </span>
                <Download className="h-4 w-4" />
                <input
                  id="educationCertifications"
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={(e) => handleFileChange(e, 'educationCertifications')}
                />
              </label>
            </div>
          </div>

          {/* ---------- Buttons ---------- */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              className="border-2 border-red-500 text-red-500 hover:bg-red-50"
              onClick={() => setFormData((p) => ({ ...p }))} // simple reset – you can improve
            >
              Discard Changes
            </Button>
            <Button
              type="button"
              onClick={handleSaveChanges}
              className="bg-teal-600 text-white hover:bg-teal-700"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}