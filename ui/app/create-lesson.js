import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { COLORS } from '../constants/colors';
import { Picker } from '@react-native-picker/picker';

// Mock data for dropdowns
const CLASSES = ["Class 1", "Class 2", "Class 3", "Class 4", "Class 5"];
const SUBJECTS = {
  "Class 4": ["Mathematics", "Science", "English", "Social Studies"],
  // Add other class subjects as needed
};
const UNITS = {
  "Mathematics": ["Numbers and Operations", "Shapes and Spatial Relationships", "Measurement", "Data Handling"],
  // Add other subject units as needed
};

// Mock lesson content generator
const generateLessonContent = (classSelected, subject, unit) => {
  if (classSelected === "Class 4" && subject === "Mathematics" && unit === "Numbers and Operations") {
    return `# Numbers Beyond 1000

## Learning Objectives
- Understand numbers beyond 1000
- Identify ranges of numbers for different situations
- Use real-world data to illustrate large numbers

## Introduction (10 minutes)
Start by asking students about big numbers they encounter in their daily lives:
- Population of their city
- Cost of expensive items
- Number of stars visible in the sky

## Main Concepts (20 minutes)

### 1. Place Value System
- Explain how numbers are organized in groups of three
- Demonstrate using place value chart:
  * Ones
  * Tens
  * Hundreds
  * Thousands

### 2. Reading Large Numbers
- Break numbers into groups
- Use commas to separate groups
- Practice reading numbers aloud

## Activities (15 minutes)

### Activity 1: Number Cards
Materials needed:
- Number cards (0-9)
- Place value chart

Steps:
1. Distribute number cards
2. Ask students to form different 4-digit numbers
3. Have them read the numbers aloud
4. Discuss the place value of each digit

### Activity 2: Real World Numbers
- Bring newspaper clippings with large numbers
- Discuss population statistics
- Look at prices of various items

## Practice Problems (10 minutes)
1. Write the following numbers in words:
   - 1,234
   - 5,678
   - 9,999

2. Arrange in ascending order:
   - 2,345
   - 2,354
   - 2,435
   - 2,543

## Assessment
Check understanding through:
- Verbal questions
- Written exercises
- Group activities

## Homework
- Find 5 examples of four-digit numbers in daily life
- Write them in words and expanded form

## Additional Resources
- Number charts
- Place value cards
- Online math games
- Worksheet templates

## Teaching Tips
- Use real-life examples
- Encourage group work
- Provide visual aids
- Give immediate feedback
- Allow hands-on practice`;
  }
  
  // Default template for other combinations
  return `# ${unit}

## Learning Objectives
- Objective 1
- Objective 2
- Objective 3

## Introduction (10 minutes)
Brief introduction to the topic...

## Main Concepts (20 minutes)
### 1. First Concept
- Key points
- Examples

### 2. Second Concept
- Key points
- Examples

## Activities (15 minutes)
### Activity 1: [Name]
Materials needed:
- Item 1
- Item 2

Steps:
1. Step 1
2. Step 2
3. Step 3

## Practice Problems (10 minutes)
1. Problem 1
2. Problem 2
3. Problem 3

## Assessment
Assessment methods...

## Homework
Homework assignments...

## Additional Resources
- Resource 1
- Resource 2

## Teaching Tips
- Tip 1
- Tip 2`;
};

export default function CreateLessonScreen() {
  const router = useRouter();
  const [classSelected, setClassSelected] = useState(CLASSES[0]);
  const [subject, setSubject] = useState('');
  const [unit, setUnit] = useState('');
  const [lessonContent, setLessonContent] = useState('');
  const [isGenerated, setIsGenerated] = useState(false);

  const handleGenerate = () => {
    const content = generateLessonContent(classSelected, subject, unit);
    setLessonContent(content);
    setIsGenerated(true);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      {/* Header */}
      <View style={{ 
        backgroundColor: 'white',
        paddingTop: 50,
        paddingBottom: 20,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialIcons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginLeft: 15 }}>Create Lesson</Text>
        </View>
      </View>

      <ScrollView style={{ flex: 1, padding: 20 }}>
        {!isGenerated ? (
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 15 }}>
            {/* Class Selection */}
            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontSize: 16, fontWeight: '500', marginBottom: 10 }}>Select Class</Text>
              <View style={{ 
                borderWidth: 1, 
                borderColor: '#ddd', 
                borderRadius: 8,
                backgroundColor: '#f8f8f8'
              }}>
                <Picker
                  selectedValue={classSelected}
                  onValueChange={(value) => {
                    setClassSelected(value);
                    setSubject('');
                    setUnit('');
                  }}
                  style={{ height: 50 }}
                >
                  {CLASSES.map((cls) => (
                    <Picker.Item key={cls} label={cls} value={cls} />
                  ))}
                </Picker>
              </View>
            </View>

            {/* Subject Selection */}
            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontSize: 16, fontWeight: '500', marginBottom: 10 }}>Select Subject</Text>
              <View style={{ 
                borderWidth: 1, 
                borderColor: '#ddd', 
                borderRadius: 8,
                backgroundColor: '#f8f8f8'
              }}>
                <Picker
                  selectedValue={subject}
                  onValueChange={(value) => {
                    setSubject(value);
                    setUnit('');
                  }}
                  style={{ height: 50 }}
                  enabled={!!classSelected}
                >
                  <Picker.Item label="Select Subject" value="" />
                  {SUBJECTS[classSelected]?.map((subj) => (
                    <Picker.Item key={subj} label={subj} value={subj} />
                  ))}
                </Picker>
              </View>
            </View>

            {/* Unit Selection */}
            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontSize: 16, fontWeight: '500', marginBottom: 10 }}>Select Unit</Text>
              <View style={{ 
                borderWidth: 1, 
                borderColor: '#ddd', 
                borderRadius: 8,
                backgroundColor: '#f8f8f8'
              }}>
                <Picker
                  selectedValue={unit}
                  onValueChange={setUnit}
                  style={{ height: 50 }}
                  enabled={!!subject}
                >
                  <Picker.Item label="Select Unit" value="" />
                  {UNITS[subject]?.map((unt) => (
                    <Picker.Item key={unt} label={unt} value={unt} />
                  ))}
                </Picker>
              </View>
            </View>

            {/* Generate Button */}
            <TouchableOpacity
              style={{
                backgroundColor: COLORS.primary,
                padding: 15,
                borderRadius: 8,
                alignItems: 'center',
                opacity: !unit ? 0.5 : 1
              }}
              onPress={handleGenerate}
              disabled={!unit}
            >
              <Text style={{ color: 'white', fontSize: 16, fontWeight: '500' }}>Generate Lesson</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 15 }}>
            {/* Back to Selection Button */}
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 20,
              }}
              onPress={() => setIsGenerated(false)}
            >
              <MaterialIcons name="arrow-back" size={20} color={COLORS.primary} />
              <Text style={{ color: COLORS.primary, marginLeft: 8 }}>Back to Selection</Text>
            </TouchableOpacity>

            {/* Lesson Content */}
            <Text style={{ fontFamily: 'monospace' }}>
              {lessonContent}
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
} 