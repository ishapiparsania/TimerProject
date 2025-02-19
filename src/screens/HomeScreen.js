  import React, { useContext, useState } from 'react';
  import { View, Text, SectionList, TouchableOpacity, StyleSheet,Button } from 'react-native';
  import TimerContext from '../context/TimerContext';
  import TimerItem from '../components/TimerItem';

  export default function HomeScreen({ navigation }) {
    const { state, dispatch } = useContext(TimerContext);
    const [expandedCategories, setExpandedCategories] = useState({});

    const toggleCategory = (category) => {
      setExpandedCategories(prev => ({
        ...prev,
        [category]: !prev[category],
      }));
    };

    const renderItem = ({ item, section }) => (
      <TimerItem 
        timer={item} 
        category={section.title} 
        dispatch={dispatch} 
      />
    );

    const renderSectionHeader = ({ section: { title } }) => (
      <View style={styles.sectionHeaderContainer}>
        <TouchableOpacity onPress={() => toggleCategory(title)} style={styles.categoryHeader}>
          <Text style={styles.sectionHeaderText}>
            {expandedCategories[title] ? '▼' : '▶'} {title}
          </Text>
        </TouchableOpacity>
      </View>
    );

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddTimer')}>
          <Text style={styles.addButtonText}>+ Add Timer</Text>
        </TouchableOpacity>
        <SectionList
          sections={Object.keys(state.timers || {}).map(category => ({
            title: category,
            data: expandedCategories[category] ? state.timers[category] : [],
          }))}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
          keyExtractor={(item) => item.id}
        />
         <View>
        <Button title="View History" onPress={() => navigation.navigate('History')} />
        </View>

      </View>
    );
  }

  const styles = StyleSheet.create({
    container: { 
      flex: 1, 
      padding: 15, 
      backgroundColor: '#f8f9fa' 
    },
  
    addButton: { 
      backgroundColor: '#4CAF50', 
      padding: 12, 
      borderRadius: 10, 
      alignItems: 'center',
      marginBottom: 10,
    },
  
    addButtonText: { 
      color: '#fff', 
      fontSize: 16, 
      fontWeight: 'bold' 
    },
  
    buttonContainer: { 
      marginBottom: 10, 
      alignItems: 'center', 
    },
  
    sectionHeaderContainer: { 
      backgroundColor: '#ffffff', 
      padding: 12, 
      borderRadius: 8, 
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      marginBottom: 10 
    },
  
    categoryHeader: { 
      flexDirection: 'row', 
      alignItems: 'center' 
    },
  
    sectionHeaderText: { 
      fontSize: 18, 
      fontWeight: 'bold', 
      color: '#333' 
    },
  
    buttonRow: { 
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      marginTop: 10 
    },
  
    actionButton: { 
      flex: 1, 
      backgroundColor: '#007BFF', 
      padding: 8, 
      borderRadius: 5, 
      alignItems: 'center', 
      marginHorizontal: 5 
    },
  
    buttonText: { 
      color: '#fff', 
      fontSize: 14, 
      fontWeight: 'bold' 
    },
  });
  
